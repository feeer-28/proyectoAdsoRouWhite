
import React, { useState, useRef, useEffect, useMemo } from "react";
import MapaDashboard from "./MapaDashboard";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import "../../../assets/dashboardAdmin.css";
import SidebarAdmin from "../sidebar/sidebarAdmin";
import ConfiguracionCuentaModal from "./confCuenta";

export default function DashboardAdmin() {
  // Loader para el mapa
  const [mapLoading, setMapLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [modalNovedades, setModalNovedades] = useState(false);
  const [modalPerfil, setModalPerfil] = useState(false);
  const [modalConfiguracion, setModalConfiguracion] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [busSeleccionado, setBusSeleccionado] = useState(null);
  const [mapModalOpen, setMapModalOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Asegura que Leaflet recalcula el tamaño cuando se abre el modal
  useEffect(() => {
    if (mapModalOpen) {
      setTimeout(() => window.dispatchEvent(new Event('resize')), 100);
    }
  }, [mapModalOpen]);

  // Datos mock organizados y listos para backend
  // Coordenadas de Popayán centro
  const popayanCenter = [2.444814, -76.614739];
  // Ejemplo de recorrido realista en Popayán
  const [rutas, setRutas] = useState([
    {
      id: 1,
      nombre: "Las Garzas → SENA",
      activa: true,
      origen: "Las Garzas",
      destino: "SENA Popayán",
      // Coordenadas aproximadas trazadas por vías principales
      puntos: [
        // Las Garzas aprox
        [2.41285, -76.56680],
        [2.41720, -76.57130],
        [2.42310, -76.57710],
        [2.42860, -76.58310],
        [2.43340, -76.59020],
        [2.43780, -76.59710],
        [2.44160, -76.60290],
        [2.44360, -76.60680],
        [2.44520, -76.61080],
        [2.44680, -76.61430],
        // Aproximación SENA (Centro de Teleinformática y Producción Industrial)
        [2.44960, -76.61790]
      ],
      buses: [101]
    }
  ]);
  // Simulación de movimiento del bus 101 sobre la ruta activa
  const rutaActiva = rutas.find(r => r.activa);
  const [busPosIndex, setBusPosIndex] = useState(0);
  const [incidencias] = useState([
    { id: 1, rutaId: 1, busId: 101, tipo: "Retraso", descripcion: "Tráfico pesado", fecha: "2025-09-10T15:00:00Z", estado: "abierta" },
    { id: 2, rutaId: 2, busId: 102, tipo: "Avería", descripcion: "Motor", fecha: "2025-09-09T12:00:00Z", estado: "cerrada" },
  ]);
  const [vehiculos] = useState([
    { id: 101, nombre: "Bus 101", estado: "en ruta" },
    { id: 102, nombre: "Bus 102", estado: "en base" },
    { id: 103, nombre: "Bus 103", estado: "mantenimiento" },
  ]);

  // Memo de conteos y filtros (dependen de incidencias y rutas, que ya están inicializadas arriba)
  const rutasActivas = useMemo(() => rutas.filter(r => r.activa), [rutas]);
  const rutasInactivas = useMemo(() => rutas.filter(r => !r.activa), [rutas]);
  const incidenciasAbiertas = useMemo(() => incidencias.filter(i => i.estado === "abierta"), [incidencias]);

  // Calcula la posición actual del bus 101 sobre la ruta activa (corrige índice fraccional)
  const bus101Pos = (() => {
    if (!rutaActiva || !Array.isArray(rutaActiva.puntos) || rutaActiva.puntos.length === 0) return [2.4440, -76.6060];
    const idx = Math.max(0, Math.min(Math.floor(busPosIndex), rutaActiva.puntos.length - 1));
    return rutaActiva.puntos[idx];
  })();
  // Buses con posición animada para el bus 101
  const buses = [
    { id: 101, nombre: "Bus 101", lat: bus101Pos[0], lng: bus101Pos[1], rutaId: 1, estado: "en ruta" },
    { id: 102, nombre: "Bus 102", lat: 2.4480, lng: -76.6090, rutaId: 2, estado: "en base" },
    { id: 103, nombre: "Bus 103", lat: 2.4500, lng: -76.6150, rutaId: null, estado: "mantenimiento" },
  ];

  // Efecto para animar el movimiento del bus 101 (más fluido)
  useEffect(() => {
    if (!rutaActiva) return;
    const interval = setInterval(() => {
      setBusPosIndex(prev => {
        // permitir valores fraccionales para suavidad
        const step = 0.25; // menor = más suave
        const next = prev + step;
        if (next < rutaActiva.puntos.length - 1) {
          return next;
        } else {
          return 0; // Reinicia el recorrido
        }
      });
    }, 200); // tick más rápido para animación suave
    return () => clearInterval(interval);
  }, [rutaActiva]);
  const navigate = useNavigate();

  // Estado de novedades
  const [novedades, setNovedades] = useState(() => {
    try {
      const guardadas = localStorage.getItem("novedadesAdmin");
      return guardadas
        ? JSON.parse(guardadas)
        : [
          { id: 1, fecha: "08/08/2025", titulo: "Nueva función de reservas", descripcion: "Ahora puedes gestionar reservas desde el panel principal." },
          { id: 2, fecha: "05/08/2025", titulo: "Mejora de seguridad", descripcion: "Se actualizó el sistema de autenticación para mayor seguridad." },
          { id: 3, fecha: "01/08/2025", titulo: "Optimización de rendimiento", descripcion: "La carga de datos es ahora un 40% más rápida." }
        ];
    } catch (e) {
      console.error("Error leyendo novedades de localStorage:", e);
      return [
        { id: 1, fecha: "08/08/2025", titulo: "Nueva función de reservas", descripcion: "Ahora puedes gestionar reservas desde el panel principal." },
        { id: 2, fecha: "05/08/2025", titulo: "Mejora de seguridad", descripcion: "Se actualizó el sistema de autenticación para mayor seguridad." },
        { id: 3, fecha: "01/08/2025", titulo: "Optimización de rendimiento", descripcion: "La carga de datos es ahora un 40% más rápida." }
      ];
    }
  });

  // Estado para edición de novedades
  const [editandoNovedad, setEditandoNovedad] = useState(null);
  const [novedadEditada, setNovedadEditada] = useState({ titulo: "", descripcion: "" });

  // Estado para nueva novedad
  const [nuevaNovedad, setNuevaNovedad] = useState({ titulo: "", descripcion: "" });

  // Guardar novedades en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem("novedadesAdmin", JSON.stringify(novedades));
    } catch (e) {
      console.error("Error guardando novedades en localStorage:", e);
    }
  }, [novedades]);

  const cerrarSesion = () => {
    const confirmar = window.confirm("¿Estás seguro que quieres cerrar sesión?");
    if (confirmar) {
      localStorage.removeItem('tokenAdmin');
      navigate('/login-administrador');
    }
  };

  const handleGuardarPerfil = () => {
    console.log("Datos guardados:", perfil);
    alert("Perfil actualizado correctamente");
    setModalPerfil(false);
  };

  // Función para agregar novedad
  const agregarNovedad = () => {
    if (!nuevaNovedad.titulo.trim() || !nuevaNovedad.descripcion.trim()) {
      alert("Por favor completa todos los campos");
      return;
    }

    const fechaHoy = new Date().toLocaleDateString("es-CO");
    const nueva = {
      id: novedades.length > 0 ? Math.max(...novedades.map(n => n.id)) + 1 : 1,
      fecha: fechaHoy,
      titulo: nuevaNovedad.titulo,
      descripcion: nuevaNovedad.descripcion
    };

    setNovedades([nueva, ...novedades]);
    setNuevaNovedad({ titulo: "", descripcion: "" });
  };

  // Función para eliminar novedad
  const eliminarNovedad = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta novedad?")) {
      setNovedades(novedades.filter(n => n.id !== id));
      if (editandoNovedad === id) {
        setEditandoNovedad(null);
      }
    }
  };

  // Función para iniciar edición
  const iniciarEdicion = (novedad) => {
    setEditandoNovedad(novedad.id);
    setNovedadEditada({
      titulo: novedad.titulo,
      descripcion: novedad.descripcion
    });
  };

  // Función para guardar cambios de edición
  const guardarEdicion = () => {
    if (!novedadEditada.titulo.trim() || !novedadEditada.descripcion.trim()) {
      alert("Por favor complete todos los campos");
      return;
    }

    setNovedades(novedades.map(n =>
      n.id === editandoNovedad
        ? { ...n, titulo: novedadEditada.titulo, descripcion: novedadEditada.descripcion }
        : n
    ));
    setEditandoNovedad(null);
  };

  // Función para cancelar edición
  const cancelarEdicion = () => {
    setEditandoNovedad(null);
  };

  // Datos de perfil
  const [perfil, setPerfil] = useState({
    nombre: "Yesid Ortiz",
    usuario: "Yesidortiz2007",
    correo: "yesid@example.com",
    contrasena: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("tokenAdmin");
    if (!token) {
      navigate("/login");
      return;
    }

    import("../../../services/api").then(({ apiFetch }) => {
      apiFetch("/api/register/admin/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const ct = res.headers.get("content-type") || "";
          if (!ct.includes("application/json")) {
            throw new Error("Respuesta no JSON");
          }
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data) && data.length) {
            setRutas(data);
          } else {
            console.warn("Respuesta vacía/ inválida. Manteniendo rutas locales mock.");
          }
        })
        .catch((err) => {
          console.error("Error al obtener rutas:", err);
          // No borrar rutas mock si hay error
        });
    });
  }, [navigate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target.id !== "profileBtn"
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <SidebarAdmin />

      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative" }}>
        <div className="profile-menu-container">
          <button
            className="profile-btn"
            id="profileBtn"
            onClick={() => setOpen(!open)}
          >
            <span className="profile-initial">Y</span>
          </button>
          <div
            className={`profile-dropdown ${open ? "open" : ""}`}
            id="profileDropdown"
            ref={dropdownRef}
          >
            <div className="profile-header">
              <span className="profile-initial big">Y</span>
              <div className="profile-user">{perfil.usuario}</div>
            </div>
            <ul>
              <li><button type="button" onClick={() => setModalNovedades(true)}>Novedades</button></li>
              <li><button type="button" onClick={() => setModalPerfil(true)}>Mi Perfil</button></li>
              <li>
                <button type="button" onClick={() => setModalConfiguracion(true)}>
                  Configuración De Cuenta
                </button>
              </li>
            </ul>
            <div className="profile-signout">
              <button className="btn-logout" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>

        <main className="dashboard-main" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>
          {/* Tarjetas de estadísticas CLÁSICAS */}
          <section className="stats-cards" style={{ maxWidth: 900, width: "100%", margin: "0 auto 24px auto" }}>
            <div className="card purple">
              <div className="card-icon">🗺️</div>
              <div className="card-value">{rutas.length}</div>
              <span>Total Rutas</span>
            </div>
            <div className="card blue">
              <div className="card-icon">✅</div>
              <div className="card-value">{rutasActivas.length}</div>
              <span>Rutas Activas</span>
            </div>
            <div className="card yellow">
              <div className="card-icon">⏸️</div>
              <div className="card-value">{rutasInactivas.length}</div>
              <span>Rutas Inactivas</span>
            </div>
            <div className="card red">
              <div className="card-icon">⚠️</div>
              <div className="card-value">{incidenciasAbiertas.length}</div>
              <span>Incidencias</span>
            </div>
          </section>

          {/* Buscador de buses */}
          {/* Buscador clásico alineado */}
          <div style={{ width: "100%", maxWidth: 900, margin: "0 auto 16px auto", display: "flex", gap: 12, alignItems: "center", justifyContent: "flex-end" }}>
            <input
              type="text"
              placeholder="Buscar bus por nombre o ID..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              style={{ padding: 8, borderRadius: 6, border: "1px solid #ccc", width: 220, marginRight: 8 }}
            />
            <button
              style={{ padding: "8px 18px", borderRadius: 6, background: "#fa812f", color: "#fff", border: "none", fontWeight: 600, cursor: "pointer" }}
              onClick={() => {
                const normalizar = (str) => String(str).toLowerCase().replace(/\s+/g, "");
                const bus = buses.find(b =>
                  normalizar(b.nombre).includes(normalizar(busqueda)) ||
                  normalizar(b.id).includes(normalizar(busqueda))
                );
                setBusSeleccionado(bus || null);
                setMapModalOpen(true);
              }}
            >Buscar</button>
          </div>

          {/* Mapa real de Popayán con recorrido y bus personalizado */}
          {/* Botón para ampliar, fuera del mapa para no bloquear interacciones */}
          <div style={{ width: "100%", maxWidth: 900, margin: "0 auto 8px auto", display: "flex", justifyContent: "flex-end" }}>
            <button
              style={{ padding: "8px 14px", borderRadius: 8, background: "#3b82f6", color: "#fff", border: "none", fontWeight: 700, cursor: "pointer" }}
              onClick={() => setMapModalOpen(true)}
            >Ampliar mapa</button>
          </div>

          {/* Mapa profesional con loader y leyenda */}
          <div style={{ width: "100%", maxWidth: 900, margin: "0 auto 32px auto" }}>
            <MapaDashboard
              popayanCenter={popayanCenter}
              mapLoading={mapLoading}
              setMapLoading={setMapLoading}
              rutas={rutas}
              rutaActiva={rutaActiva}
              busSeleccionado={busSeleccionado}
              buses={buses}
              busPosIndex={busPosIndex}
            />
          </div>

          {/* Modal de mapa ampliado */}
          {mapModalOpen && (
            <div
              style={{
                position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.7)", zIndex: 2000,
                display: "flex", alignItems: "center", justifyContent: "center"
              }}
              onClick={() => setMapModalOpen(false)}
            >
              <div
                style={{ width: "90vw", height: "80vh", background: "#fff", borderRadius: 18, overflow: "hidden", boxShadow: "0 6px 32px #0008", position: "relative" }}
                onClick={e => e.stopPropagation()}
              >
                <button
                  style={{ position: "absolute", top: 12, right: 18, zIndex: 10, background: "#ef4444", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 700, cursor: "pointer" }}
                  onClick={() => setMapModalOpen(false)}
                >Cerrar</button>
                <div style={{ width: "100%", height: "100%" }}>
                  <MapaDashboard
                    popayanCenter={popayanCenter}
                    mapLoading={mapLoading}
                    setMapLoading={setMapLoading}
                    rutas={rutas}
                    rutaActiva={rutaActiva}
                    busSeleccionado={busSeleccionado}
                    buses={buses}
                    busPosIndex={busPosIndex}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Grillas de datos ÚNICAS, sin duplicados */}
          <div className="dashboard-grid" style={{ maxWidth: 900, width: "100%" }}>
            <div className="dashboard-box">
              <h3>Rutas Activas</h3>
              <table>
                <thead>
                  <tr>
                    <th>Ruta</th>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Buses</th>
                  </tr>
                </thead>
                <tbody>
                  {rutas.filter(r => r.activa).length === 0 ? (
                    <tr><td colSpan="4">No hay rutas activas.</td></tr>
                  ) : (
                    rutas.filter(r => r.activa).map((ruta, index) => (
                      <tr key={index}>
                        <td>{ruta.nombre}</td>
                        <td>{ruta.origen}</td>
                        <td>{ruta.destino}</td>
                        <td>{ruta.buses.map(id => buses.find(b => b.id === id)?.nombre).join(", ")}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="dashboard-box">
              <h3>Incidencias</h3>
              <table>
                <thead>
                  <tr>
                    <th>Ruta</th>
                    <th>Bus</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {incidencias.length === 0 ? (
                    <tr><td colSpan="4">No hay incidencias.</td></tr>
                  ) : (
                    incidencias.map((inc, idx) => (
                      <tr key={idx}>
                        <td>{rutas.find(r => r.id === inc.rutaId)?.nombre}</td>
                        <td>{buses.find(b => b.id === inc.busId)?.nombre}</td>
                        <td>{inc.tipo}</td>
                        <td>{inc.estado}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="dashboard-box">
              <h3>Estado de Vehículos</h3>
              <table>
                <thead>
                  <tr>
                    <th>Vehículo</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {vehiculos.length === 0 ? (
                    <tr><td colSpan="2">No hay vehículos.</td></tr>
                  ) : (
                    vehiculos.map((v, idx) => (
                      <tr key={idx}>
                        <td>{v.nombre}</td>
                        <td>{v.estado}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Cuarta tarjeta/box: Rutas Inactivas */}
            <div className="dashboard-box">
              <h3>Rutas Inactivas</h3>
              <table>
                <thead>
                  <tr>
                    <th>Ruta</th>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Buses</th>
                  </tr>
                </thead>
                <tbody>
                  {rutas.filter(r => !r.activa).length === 0 ? (
                    <tr><td colSpan="4">No hay rutas inactivas.</td></tr>
                  ) : (
                    rutas.filter(r => !r.activa).map((ruta, index) => (
                      <tr key={index}>
                        <td>{ruta.nombre}</td>
                        <td>{ruta.origen}</td>
                        <td>{ruta.destino}</td>
                        <td>{ruta.buses.map(id => buses.find(b => b.id === id)?.nombre).join(", ")}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Modal de Novedades */}
      {modalNovedades && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
          }}
          onClick={() => setModalNovedades(false)}
        >
          <div
            style={{
              background: "#fff", borderRadius: "12px", padding: "22px", width: "480px",
              maxHeight: "82vh", overflowY: "auto", boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
              animation: "fadeIn 0.25s ease-in-out"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <h2 style={{ margin: 0, color: "#222", fontSize: "18px" }}>📢 Novedades del Proyecto</h2>
              <span style={{ fontSize: "13px", color: "#666" }}>{novedades.length} registradas</span>
            </div>

            <p style={{ marginTop: 0, marginBottom: 12, fontSize: 13, color: "#555" }}>
              Añade novedades rápidas desde aquí. Se guardan localmente en tu navegador.
            </p>

            {/* Formulario para añadir novedad */}
            <div style={{
              background: "#f5f9ff", padding: "12px", borderRadius: "8px",
              marginBottom: "14px", border: "1px solid #e1efff"
            }}>
              <label style={{ fontSize: 13, color: "#444" }}>Título</label>
              <input
                type="text"
                placeholder="Título de la novedad"
                value={nuevaNovedad.titulo}
                onChange={(e) => setNuevaNovedad({ ...nuevaNovedad, titulo: e.target.value })}
                style={{
                  width: "100%", padding: "9px 10px", marginTop: "6px",
                  marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccdffb",
                  outline: "none", fontSize: 14
                }}
              />
              <label style={{ fontSize: 13, color: "#444" }}>Descripción</label>
              <textarea
                placeholder="Descripción breve..."
                value={nuevaNovedad.descripcion}
                onChange={(e) => setNuevaNovedad({ ...nuevaNovedad, descripcion: e.target.value })}
                style={{
                  width: "100%", padding: "9px 10px", marginTop: "6px",
                  marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccdffb",
                  outline: "none", fontSize: 14, resize: "vertical", minHeight: 70
                }}
              />

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={agregarNovedad}
                  style={{
                    padding: "9px 14px",
                    background: "linear-gradient(90deg,#4caf50,#2e9e3d)",
                    color: "#fff", border: "none", borderRadius: "8px",
                    cursor: "pointer", fontWeight: "600", flex: "1"
                  }}
                >
                  ➕ Añadir novedad
                </button>
                <button
                  onClick={() => {
                    setNuevaNovedad({ titulo: "", descripcion: "" });
                  }}
                  style={{
                    padding: "9px 14px",
                    background: "#f3f3f3",
                    color: "#333", border: "none", borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  Limpiar
                </button>
              </div>
            </div>

            {/* Lista de novedades */}
            {novedades.length === 0 ? (
              <p style={{ textAlign: "center", color: "#777", marginBottom: 10 }}>No hay novedades registradas.</p>
            ) : (
              novedades.map((n) => (
                <div key={n.id} style={{
                  background: "#ffffff",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  borderLeft: "5px solid #ffb300",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    {editandoNovedad === n.id ? (
                      <input
                        value={novedadEditada.titulo}
                        onChange={(e) => setNovedadEditada({ ...novedadEditada, titulo: e.target.value })}
                        style={{
                          flex: 1,
                          padding: "6px",
                          border: "1px solid #ddd",
                          borderRadius: "4px"
                        }}
                      />
                    ) : (
                      <strong style={{ fontSize: 14, color: "#222" }}>{n.titulo}</strong>
                    )}
                    <span style={{ fontSize: 12, color: "#888" }}>{n.fecha}</span>
                  </div>

                  {editandoNovedad === n.id ? (
                    <textarea
                      value={novedadEditada.descripcion}
                      onChange={(e) => setNovedadEditada({ ...novedadEditada, descripcion: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "6px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        marginBottom: "8px",
                        minHeight: "60px"
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, fontSize: 13, color: "#444" }}>{n.descripcion}</p>
                  )}

                  <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                    {editandoNovedad === n.id ? (
                      <>
                        <button
                          onClick={guardarEdicion}
                          style={{
                            padding: "4px 8px",
                            background: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          Guardar
                        </button>
                        <button
                          onClick={cancelarEdicion}
                          style={{
                            padding: "4px 8px",
                            background: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => iniciarEdicion(n)}
                          style={{
                            padding: "4px 8px",
                            background: "#2196F3",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => eliminarNovedad(n.id)}
                          style={{
                            padding: "4px 8px",
                            background: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}

            <button
              onClick={() => setModalNovedades(false)}
              style={{
                marginTop: "6px", padding: "10px 14px", background: "#ff9800",
                color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", width: "100%"
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {/* Modal de Perfil */}
      {modalPerfil && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100%", height: "100%",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex", justifyContent: "center", alignItems: "center",
            zIndex: 1000
          }}
          onClick={() => setModalPerfil(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "25px",
              width: "420px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
              animation: "fadeIn 0.3s ease-in-out",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Avatar */}
            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              <label htmlFor="avatarInput" style={{ cursor: "pointer" }}>
                <img
                  src={perfil.foto || "../../assets/imgperfil.png"}
                  alt="Avatar"
                  style={{
                    width: "100px", height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #ffb300",
                    transition: "transform 0.3s"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
              </label>
              <input
                type="file"
                id="avatarInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setPerfil({ ...perfil, foto: reader.result });
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>

            <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
              👤 Mi Perfil
            </h2>

            {/* Inputs estilizados */}
            {[
              { label: "Nombre", type: "text", key: "nombre" },
              { label: "Usuario", type: "text", key: "usuario" },
              { label: "Correo", type: "email", key: "correo" },
              { label: "Contraseña", type: "password", key: "contrasena" }
            ].map(({ label, type, key }) => (
              <div key={key} style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold", fontSize: "14px", color: "#555" }}>{label}</label>
                <input
                  type={type}
                  value={perfil[key]}
                  onChange={(e) => setPerfil({ ...perfil, [key]: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    outline: "none",
                    transition: "border-color 0.3s, box-shadow 0.3s"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#ffb300";
                    e.target.style.boxShadow = "0 0 5px rgba(255,179,0,0.5)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ccc";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            ))}

            {/* Botones */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <button
                onClick={handleGuardarPerfil}
                style={{
                  flex: 1,
                  padding: "10px 15px",
                  background: "linear-gradient(45deg, #ffb300, #ff9500)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginRight: "10px",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                Guardar cambios
              </button>
              <button
                onClick={() => setModalPerfil(false)}
                style={{
                  flex: 1,
                  padding: "10px 15px",
                  background: "#ccc",
                  color: "#000",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>

      )}
      <ConfiguracionCuentaModal
        modalConfiguracion={modalConfiguracion}
        setModalConfiguracion={setModalConfiguracion}
        perfil={perfil}
        setPerfil={setPerfil}
      />



    </div>
  );
}
