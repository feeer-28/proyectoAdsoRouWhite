import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup, useMap, LayersControl, LayerGroup, ZoomControl } from "react-leaflet";

// Utilidad para interpolar posición de un bus entre puntos de una ruta y calcular el ángulo de rumbo
function useInterpolatedBusPosition(rutaPuntos, progress) {
    if (!Array.isArray(rutaPuntos) || rutaPuntos.length < 2) return null;
    const maxIdx = rutaPuntos.length - 1;
    const clamped = Math.max(0, Math.min(progress, maxIdx - 1));
    const i = Math.floor(clamped);
    const frac = clamped - i;
    const [lat1, lng1] = rutaPuntos[i];
    const [lat2, lng2] = rutaPuntos[i + 1];
    // Interpolación lineal
    const lat = lat1 + (lat2 - lat1) * frac;
    const lng = lng1 + (lng2 - lng1) * frac;
    // Calcular rumbo aproximado en grados (0=Norte)
    const toRad = (d) => (d * Math.PI) / 180;
    const toDeg = (r) => (r * 180) / Math.PI;
    const x = (lng2 - lng1) * Math.cos(toRad((lat1 + lat2) / 2));
    const y = lat2 - lat1;
    const angle = (toDeg(Math.atan2(x, y)) + 360) % 360;
    return { lat, lng, angle };
}
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Helpers para clasificar POIs importantes y crear íconos bonitos
const getImportantCategory = (tags = {}) => {
    const amenity = tags.amenity;
    const aeroway = tags.aeroway;
    // Prioridad por importancia
    if (amenity === 'hospital' || amenity === 'clinic') return { id: 'health', label: 'Salud', color: '#dc2626', emoji: '🏥' };
    if (aeroway === 'aerodrome') return { id: 'airport', label: 'Aeropuerto', color: '#0ea5e9', emoji: '✈️' };
    if (amenity === 'railway_station') return { id: 'rail', label: 'Estación de tren', color: '#7c3aed', emoji: '🚆' };
    if (amenity === 'bus_station') return { id: 'bus', label: 'Terminal de buses', color: '#2563eb', emoji: '🚌' };
    if (amenity === 'police') return { id: 'police', label: 'Policía', color: '#1d4ed8', emoji: '👮' };
    if (amenity === 'fire_station') return { id: 'fire', label: 'Bomberos', color: '#f97316', emoji: '🚒' };
    if (amenity === 'townhall') return { id: 'townhall', label: 'Alcaldía', color: '#16a34a', emoji: '🏛️' };
    if (amenity === 'courthouse') return { id: 'court', label: 'Juzgado', color: '#16a34a', emoji: '⚖️' };
    if (amenity === 'university' || amenity === 'college') return { id: 'university', label: 'Universidad', color: '#9333ea', emoji: '🎓' };
    if (amenity === 'school' || amenity === 'library') return { id: 'education', label: 'Educación', color: '#6366f1', emoji: '📚' };
    if (amenity === 'bank' || amenity === 'atm') return { id: 'bank', label: 'Finanzas', color: '#0d9488', emoji: '🏦' };
    if (amenity === 'place_of_worship') return { id: 'worship', label: 'Templo', color: '#64748b', emoji: '🛐' };
    // Otros (no mostrar)
    return null;
};

const getPoiDivIcon = (cat) => {
    const color = cat?.color || '#111827';
    const emoji = cat?.emoji || '📍';
    const html = `
      <div style="display:flex;align-items:center;justify-content:center;width:30px;height:30px;border-radius:50%;background:${color};color:#fff;font-size:16px;box-shadow:0 2px 8px rgba(0,0,0,.25);border:2px solid #fff">
        <span>${emoji}</span>
      </div>`;
    return L.divIcon({ html, className: '', iconSize: [30, 30], iconAnchor: [15, 15], popupAnchor: [0, -12] });
};

// Genera un icono de bus rotado según ángulo (usando CSS transform)
function getRotatedBusIcon(angleDeg = 0) {
    // Usamos un divIcon con una imagen que rota via CSS inline
    const html = `
      <div style="width:44px;height:44px;transform: rotate(${angleDeg}deg);transform-origin:center center;display:flex;align-items:center;justify-content:center;">
        <svg viewBox="0 0 64 64" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
          <!-- cuerpo del bus -->
          <rect x="6" y="12" width="52" height="32" rx="6" fill="#2563eb" />
          <rect x="6" y="28" width="52" height="8" fill="#1e40af" />
          <!-- ventanas -->
          <rect x="10" y="16" width="24" height="12" rx="2" fill="#dbeafe" />
          <rect x="36" y="16" width="18" height="12" rx="2" fill="#dbeafe" />
          <!-- ruedas -->
          <circle cx="20" cy="46" r="6" fill="#111827" />
          <circle cx="48" cy="46" r="6" fill="#111827" />
        </svg>
      </div>`;
    return L.divIcon({
        html,
        className: "",
        iconSize: [40, 40],
        iconAnchor: [20, 20],
        popupAnchor: [0, -20]
    });
}

export default function MapaDashboard({
    popayanCenter,
    mapLoading,
    setMapLoading,
    rutas,
    rutaActiva,
    busSeleccionado,
    buses,
    busPosIndex
}) {
    const [useBackupTiles, setUseBackupTiles] = useState(false);
    const mapRef = useRef(null);
    const [mapReady, setMapReady] = useState(false);
    const [searchText, setSearchText] = useState('SENA Popayán');
    const handleSearch = () => {
        if (!mapRef.current || !searchText) return;
        try {
            const q = encodeURIComponent(searchText);
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${q}`;
            fetch(url)
                .then(r => r.ok ? r.json() : Promise.reject('error'))
                .then(list => {
                    const item = Array.isArray(list) && list[0];
                    if (item) {
                        const lat = parseFloat(item.lat);
                        const lon = parseFloat(item.lon);
                        mapRef.current.flyTo([lat, lon], 17, { duration: 1.2 });
                    }
                })
                .catch(() => { });
        } catch { }
    };

    useEffect(() => {
        // Forzar ocultar loader por si eventos no llegan
        if (typeof setMapLoading === 'function') {
            setMapLoading(false);
        }
        // Inyecta estilos para animación de pulso si no existen
        if (typeof document !== 'undefined' && !document.getElementById('leaflet-pulse-style')) {
            const style = document.createElement('style');
            style.id = 'leaflet-pulse-style';
            style.textContent = `
              @keyframes pulse {
                0% { box-shadow: 0 0 0 0 rgba(239,68,68,0.7); }
                70% { box-shadow: 0 0 0 14px rgba(239,68,68,0); }
                100% { box-shadow: 0 0 0 0 rgba(239,68,68,0); }
              }
            `;
            document.head.appendChild(style);
        }
    }, []);

    const [baseLayer, setBaseLayer] = useState("osm");
    const baseLayers = {
        // OSM estándar
        osm: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        // HOT Humanitarian
        hot: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        // Carto basemaps (más contraste de ciudad)
        carto_light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
        carto_dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        // Stamen Toner (buena definición de barrios/calles)
        stamen_toner: "https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",
        // Esri
        esri_street: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
        esri_sat: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        // OSM labels overlay (solo etiquetas) - alternativa Carto labels only
        carto_labels: "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png"
    };
    const tileUrl = baseLayers[baseLayer] || baseLayers.osm;

    // Ajustar el mapa a los límites de una ruta seleccionada
    function FitBoundsOnSelect({ positions }) {
        const map = useMap();
        useEffect(() => {
            if (positions && positions.length > 1) {
                try {
                    map.fitBounds(positions, { padding: [24, 24], maxZoom: 16 });
                } catch (e) { /* noop */ }
            }
        }, [positions]);
        return null;
    }

    // Safeties para evitar errores que causen pantalla en blanco
    const safeRutas = Array.isArray(rutas) ? rutas : [];
    const safeBuses = Array.isArray(buses) ? buses : [];
    const selectedRoute = busSeleccionado ? safeRutas.find(r => r.id === busSeleccionado.rutaId) : null;
    const selectedPoints = Array.isArray(selectedRoute?.puntos) ? selectedRoute.puntos : [];

    // Ruteo real por calles usando OSRM; si falla, usamos los puntos originales
    const [routedPoints, setRoutedPoints] = useState([]);
    const [routingError, setRoutingError] = useState(null);
    useEffect(() => {
        setRoutedPoints([]);
        setRoutingError(null);
        if (!selectedPoints || selectedPoints.length < 2) return;
        try {
            const coords = selectedPoints.map(([lat, lng]) => `${lng},${lat}`).join(";");
            const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson&steps=false`;
            fetch(osrmUrl)
                .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
                .then(data => {
                    const geo = data?.routes?.[0]?.geometry?.coordinates || [];
                    const pts = geo.map(([lng, lat]) => [lat, lng]);
                    if (pts.length > 1) {
                        setRoutedPoints(pts);
                    } else {
                        setRoutingError('Sin ruta OSRM');
                    }
                })
                .catch(() => {
                    // Fallback a GraphHopper demo si OSRM falla (más robusto en ciudades)
                    const key = 'demo'; // si tienes tu API key, reemplázala
                    const ghUrl = `https://graphhopper.com/api/1/route?point=${selectedPoints.map(p => p.join(',')).join('&point=')}&profile=car&points_encoded=false&locale=es&key=${key}`;
                    fetch(ghUrl)
                        .then(rr => rr.ok ? rr.json() : Promise.reject(rr.statusText))
                        .then(gh => {
                            const coords = gh?.paths?.[0]?.points?.coordinates || [];
                            const pts = coords.map(([lng, lat]) => [lat, lng]);
                            if (pts.length > 1) setRoutedPoints(pts);
                            else setRoutingError('Sin ruta GraphHopper');
                        })
                        .catch(() => setRoutingError('Fallo ruteo'));
                });
        } catch { /* noop */ }
    }, [selectedRoute?.id, selectedPoints.length]);

    const renderPoints = routedPoints.length > 1 ? routedPoints : selectedPoints;

    // Navegación: ruta Las Garzas -> SENA Norte Teleinformática Popayán
    const [navPoints, setNavPoints] = useState([]);
    const [navInfo, setNavInfo] = useState(null);
    const geocode = async (q) => {
        // Soporta entrada directa "lat,lon"
        const ll = String(q).trim().match(/^\s*(-?\d+(?:\.\d+)?)\s*,\s*(-?\d+(?:\.\d+)?)\s*$/);
        if (ll) {
            return { lat: parseFloat(ll[1]), lon: parseFloat(ll[2]), raw: { display_name: q } };
        }
        const q2 = `${q} Popayán, Cauca, Colombia`;
        // Restringir resultados a Popayán para evitar coincidencias ambiguas
        // Formato viewbox Nominatim: left,top,right,bottom (lon,lat) — ampliado para incluir el SENA
        const viewbox = '-76.67,2.50,-76.55,2.40';
        const params = new URLSearchParams({
            format: 'json',
            q: q2,
            addressdetails: '1',
            limit: '1',
            countrycodes: 'co',
            'accept-language': 'es',
            viewbox,
            bounded: '1'
        });
        const url = `https://nominatim.openstreetmap.org/search?${params.toString()}`;
        const r = await fetch(url);
        if (!r.ok) throw new Error('geocode');
        const list = await r.json();
        const item = Array.isArray(list) && list[0];
        if (!item) throw new Error('noresult');
        return { lat: parseFloat(item.lat), lon: parseFloat(item.lon), raw: item };
    };
    const computeRouteBetweenPlaces = async (fromQ, toQ) => {
        try {
            const from = await geocode(fromQ);
            const to = await geocode(toQ);
            // Intentar OSRM
            const osrmCoords = `${from.lon},${from.lat};${to.lon},${to.lat}`;
            // Preferir rutas urbanas evitando autopistas largas con 'driving' y 'annotations=false' (rápido)
            // bbox Popayán para recortar resultados fuera de la ciudad (ampliado para incluir el SENA)
            const bbox = '-76.67,2.40,-76.55,2.50'; // lonmin,latmin,lonmax,latmax
            const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${osrmCoords}?overview=full&geometries=geojson&steps=false&alternatives=true`;
            let ok = false;
            try {
                const r = await fetch(osrmUrl);
                if (r.ok) {
                    const data = await r.json();
                    // Elegir la alternativa que mejor caiga dentro del bbox de Popayán
                    const routes = Array.isArray(data?.routes) ? data.routes : [];
                    const pick = routes.sort((a, b) => (a.distance || 0) - (b.distance || 0)).find(rt => {
                        const coords = rt?.geometry?.coordinates || [];
                        // comprobar si el 80% de puntos caen dentro del bbox
                        let inside = 0;
                        const [minLon, minLat, maxLon, maxLat] = [-76.67, 2.40, -76.55, 2.50];
                        for (const [lng, lat] of coords) {
                            if (lng >= minLon && lng <= maxLon && lat >= minLat && lat <= maxLat) inside++;
                        }
                        return coords.length > 0 && inside / coords.length >= 0.6;
                    }) || routes[0];
                    const geo = pick?.geometry?.coordinates || [];
                    const pts = geo.map(([lng, lat]) => [lat, lng]);
                    if (pts.length > 1) {
                        setNavPoints(pts);
                        setNavInfo({ distance: pick.distance, duration: pick.duration, from, to });
                        ok = true;
                    }
                }
            } catch { }
            // Fallback GraphHopper demo
            if (!ok) {
                const ghUrl = `https://graphhopper.com/api/1/route?point=${from.lat},${from.lon}&point=${to.lat},${to.lon}&profile=car&points_encoded=false&locale=es&key=demo`;
                const rr = await fetch(ghUrl);
                if (rr.ok) {
                    const gh = await rr.json();
                    const coords = gh?.paths?.[0]?.points?.coordinates || [];
                    const pts = coords.map(([lng, lat]) => [lat, lng]);
                    if (pts.length > 1) {
                        const path = gh?.paths?.[0];
                        setNavPoints(pts);
                        setNavInfo({ distance: path?.distance, duration: path?.time ? path.time / 1000 : undefined, from, to });
                    }
                }
            }
            // Ajustar vista (centrar en Popayán y al recorrido)
            if (mapRef.current) {
                try {
                    const map = mapRef.current;
                    if (navPoints.length > 1) {
                        map.fitBounds(navPoints, { padding: [24, 24], maxZoom: 17 });
                    } else {
                        // fallback: vista por defecto para Popayán
                        map.setView([2.4448, -76.6147], 15);
                    }
                } catch { }
            }
        } catch { }
    };
    useEffect(() => {
        // Calcular una vez la ruta solicitada
        computeRouteBetweenPlaces('Las Garzas', 'SENA Norte de Teleinformática Popayán');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Cargar Puntos de Interés (POIs) cercanos usando Overpass API al moverse el mapa
    const [pois, setPois] = useState([]);
    useEffect(() => {
        if (!mapReady || !mapRef.current) return;
        let abort = false;
        const map = mapRef.current;
        const loadPOIs = () => {
            const b = map.getBounds();
            const bbox = `${b.getSouth()},${b.getWest()},${b.getNorth()},${b.getEast()}`;
            // Amenidades comunes: colegios, universidades, hospitales, bancos, restaurantes, estaciones, etc.
            const query = `[
                out:json][timeout:12];
                (
                  node["amenity"~"^(university|college|school|library|hospital|clinic|pharmacy|police|fire_station|townhall|courthouse|place_of_worship|bus_station|railway_station|ferry_terminal|fuel|parking|atm|bank|post_office)$"](${bbox});
                  way["amenity"~"^(university|college|school|library|hospital|clinic|pharmacy|police|fire_station|townhall|courthouse|place_of_worship|bus_station|railway_station|ferry_terminal|fuel|parking|atm|bank|post_office)$"](${bbox});
                  node["tourism"~"^(attraction|museum)$"](${bbox});
                  way["tourism"~"^(attraction|museum)$"](${bbox});
                  node["historic"](${bbox});
                  way["historic"](${bbox});
                  node["shop"="supermarket"](${bbox});
                  way["shop"="supermarket"](${bbox});
                );
                out center 200;`;
            fetch("https://overpass-api.de/api/interpreter", {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
                body: new URLSearchParams({ data: query }).toString()
            })
                .then(r => r.ok ? r.json() : Promise.reject('overpass'))
                .then(data => {
                    if (abort) return;
                    const items = (data.elements || []).map(el => {
                        const lat = el.lat || el.center?.lat;
                        const lon = el.lon || el.center?.lon;
                        const tags = el.tags || {};
                        const cat = getImportantCategory(tags);
                        if (!cat) return null; // solo los más importantes
                        const name = tags.name || tags.brand || tags.operator || cat.label;
                        const addr = [tags['addr:street'], tags['addr:housenumber'], tags['addr:city']].filter(Boolean).join(' ');
                        return lat && lon ? { id: el.id, lat, lon, name, cat, addr } : null;
                    }).filter(Boolean);
                    setPois(items);
                })
                .catch(() => { });
        };
        // cargar al inicio y en fin de movimiento
        loadPOIs();
        map.on('moveend', loadPOIs);
        return () => {
            abort = true;
            map.off('moveend', loadPOIs);
        };
    }, [mapReady]);

    return (
        <div
            style={{ width: "100%", height: "100%", minHeight: 350, position: "relative", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 16px #0002", background: "#fff" }}
        >

            {mapLoading && (
                <div className="loader" style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", background: "#fff8", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ background: "#fff", padding: "8px 12px", borderRadius: 8, boxShadow: "0 2px 8px #0002", fontWeight: 600 }}>Cargando mapa…</span>
                </div>
            )}
            <MapContainer
                center={Array.isArray(popayanCenter) ? popayanCenter : [2.4832482, -76.5617734]}
                zoom={15}
                maxZoom={20}
                zoomControl={false}
                scrollWheelZoom={true}
                doubleClickZoom={true}
                style={{ height: "100%", width: "100%" }}
                whenCreated={(map) => {
                    mapRef.current = map;
                    map.attributionControl.setPrefix(false);
                    // Oculta el loader cuando el mapa termina de cargar
                    map.once('load', () => setMapLoading(false));
                    // Fuerza recálculo de tamaño en el siguiente frame
                    requestAnimationFrame(() => map.invalidateSize());
                }}
                whenReady={(e) => {
                    const map = e.target;
                    mapRef.current = map;
                    setMapLoading(false);
                    // invalidar tamaño al estar listo
                    map.invalidateSize();
                    // Recalcular al cambiar tamaño de ventana
                    const onResize = () => map.invalidateSize();
                    window.addEventListener('resize', onResize);
                    // Limpieza al desmontar
                    map.once('unload', () => window.removeEventListener('resize', onResize));
                    // Señalar que el mapa está listo (para cargar POIs)
                    setMapReady(true);
                }}
            >
                <ZoomControl position="topright" />
                <LayersControl position="topright">
                    <LayersControl.BaseLayer checked name="OSM">
                        <TileLayer url={baseLayers.osm} />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="HOT (Humanitarian)">
                        <TileLayer url={baseLayers.hot} />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Carto Light">
                        <TileLayer url={baseLayers.carto_light} />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Carto Dark">
                        <TileLayer url={baseLayers.carto_dark} />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Stamen Toner">
                        <TileLayer url={baseLayers.stamen_toner} />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Esri Calles">
                        <TileLayer url={baseLayers.esri_street} />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Esri Satélite">
                        <TileLayer url={baseLayers.esri_sat} />
                    </LayersControl.BaseLayer>
                    <LayersControl.Overlay name="Etiquetas" checked>
                        <LayerGroup>
                            <TileLayer url={baseLayers.carto_labels} opacity={0.9} />
                        </LayerGroup>
                    </LayersControl.Overlay>
                </LayersControl>

                {/* POIs del mapa (amenidades importantes) */}
                {pois.map(p => (
                    <Marker key={p.id} position={[p.lat, p.lon]} icon={getPoiDivIcon(p.cat)}>
                        <Popup>
                            <div style={{ minWidth: 200 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                                    <span style={{ fontSize: 18 }}>{p.cat.emoji}</span>
                                    <div>
                                        <div style={{ fontWeight: 700, color: '#111827' }}>{p.name}</div>
                                        <div style={{ fontSize: 12, color: '#6b7280' }}>{p.cat.label}</div>
                                    </div>
                                </div>
                                {p.addr && <div style={{ fontSize: 13, color: '#374151', marginBottom: 6 }}>📍 {p.addr}</div>}
                                <a href={`https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lon}#map=18/${p.lat}/${p.lon}`} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: '#2563eb', fontWeight: 600 }}>Ver en OpenStreetMap</a>
                            </div>
                        </Popup>
                    </Marker>
                ))}

                {/* Recorrido solicitado: Las Garzas -> SENA Norte Teleinformática */}
                {navPoints.length > 1 && (
                    <>
                        <Polyline positions={navPoints} color="#16a34a" weight={10} opacity={0.25} lineCap="round" lineJoin="round" />
                        <Polyline positions={navPoints} color="#22c55e" weight={6} opacity={0.95} lineCap="round" lineJoin="round" />
                        <Polyline positions={navPoints} color="#86efac" weight={3} opacity={0.9} dashArray="6,10" lineCap="round" lineJoin="round" />
                        {/* Inicio */}
                        <Marker position={navPoints[0]} icon={L.divIcon({ html: '<div style="width:14px;height:14px;border-radius:50%;background:#2563eb;border:2px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.25);"></div>', className: '', iconSize: [14, 14], iconAnchor: [7, 7] })}>
                            <Popup>Inicio: {navInfo?.from?.raw?.display_name || 'Las Garzas'}</Popup>
                        </Marker>
                        {/* Fin */}
                        <Marker position={navPoints[navPoints.length - 1]} icon={L.divIcon({ html: '<div style="width:14px;height:14px;border-radius:50%;background:#ef4444;border:2px solid #fff;box-shadow:0 1px 6px rgba(0,0,0,.25);"></div>', className: '', iconSize: [14, 14], iconAnchor: [7, 7] })}>
                            <Popup>Destino: {navInfo?.to?.raw?.display_name || 'SENA Norte Teleinformática'}</Popup>
                        </Marker>
                    </>
                )}

                {/* Mostrar ruta solo cuando se selecciona explícitamente */}
                {busSeleccionado && selectedPoints.length > 1 && (
                    <>
                        <FitBoundsOnSelect positions={renderPoints} />
                        <Polyline positions={renderPoints} color="#1d4ed8" weight={12} opacity={0.25} lineCap="round" lineJoin="round" />
                        <Polyline positions={renderPoints} color="#3b82f6" weight={6} opacity={0.95} lineCap="round" lineJoin="round" />
                        <Polyline positions={renderPoints} color="#93c5fd" weight={3} opacity={0.8} dashArray="6,10" lineCap="round" lineJoin="round" />
                        <Marker position={renderPoints[Math.floor(Math.max(0, Math.min(busPosIndex, renderPoints.length - 1)))]} icon={L.divIcon({ html: '<div style="width:14px;height:14px;border-radius:50%;background:#ef4444;box-shadow:0 0 0 0 rgba(239,68,68,0.7);animation:pulse 1.5s infinite;"></div>', className: '', iconSize: [14, 14], iconAnchor: [7, 7] })} />
                    </>
                )}
                {/* Mostrar buses: si hay uno seleccionado, solo ese; sino, mostrar todos los que tienen ruta */}
                {(busSeleccionado ? [busSeleccionado] : safeBuses.filter(b => b && b.rutaId)).map(bus => {
                    const rutaSel = safeRutas.find(r => r.id === bus.rutaId);
                    // Si hay ruteo real, usarlo para la posición
                    const base = routedPoints.length > 1 ? routedPoints : (rutaSel?.puntos || []);
                    const pos = base.length > 1 ? useInterpolatedBusPosition(base, busPosIndex) : null;
                    const latlng = pos ? [pos.lat, pos.lng] : [bus.lat, bus.lng];
                    const icon = getRotatedBusIcon(pos?.angle || 0);
                    return (
                        <Marker key={bus.id} position={latlng} icon={icon}>
                            <Popup>
                                <b>{bus.nombre}</b><br />Estado: {bus.estado}<br />Ruta: {rutaSel?.nombre}
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
            {/* Controles: búsqueda y capas */}
            <div style={{ position: "absolute", left: 18, top: 18, background: "#fff", borderRadius: 8, padding: "6px 10px", boxShadow: "0 2px 8px #0001", display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    placeholder="Buscar lugar (p.ej. SENA Popayán)"
                    style={{ pointerEvents: 'auto', border: '1px solid #e5e7eb', borderRadius: 6, padding: '6px 8px', width: 220 }}
                />
                <button onClick={handleSearch} style={{ pointerEvents: 'auto', padding: '6px 10px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#2563eb', color: '#fff', fontWeight: 600 }}>Ir</button>
            </div>
            <div style={{ position: "absolute", right: 18, top: 18, background: "#fff", borderRadius: 8, padding: "6px 16px", boxShadow: "0 2px 8px #0001", fontWeight: 600, color: "#2563eb", fontSize: 15, opacity: 0.95, display: "flex", alignItems: "center", gap: 12 }}>
                <button onClick={() => setBaseLayer('osm')} style={{ pointerEvents: 'auto', padding: '4px 8px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff' }}>OSM</button>
                <button onClick={() => setBaseLayer('hot')} style={{ pointerEvents: 'auto', padding: '4px 8px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff' }}>HOT</button>
                <button onClick={() => setBaseLayer('carto_light')} style={{ pointerEvents: 'auto', padding: '4px 8px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff' }}>Carto Light</button>
                <button onClick={() => setBaseLayer('stamen_toner')} style={{ pointerEvents: 'auto', padding: '4px 8px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff' }}>Toner</button>
                <button onClick={() => setBaseLayer('esri_street')} style={{ pointerEvents: 'auto', padding: '4px 8px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff' }}>Esri Calles</button>
                <button onClick={() => setBaseLayer('esri_sat')} style={{ pointerEvents: 'auto', padding: '4px 8px', border: '1px solid #e5e7eb', borderRadius: 6, background: '#fff' }}>Satélite</button>
            </div>
        </div>
    );
}
