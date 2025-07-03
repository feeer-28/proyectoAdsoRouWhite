import React, { useState, useRef, useEffect } from "react";
import "../assets/inicio.css";
// import Header from "../components/header"; // Eliminado para evitar duplicado
import Footer from "../components/footer";
import Button from "../components/Button";
import Card from "../components/Card";

const rutas = [
  {
    nombre: "Ruta Centro - Norte",
    imagen: "https://media.istockphoto.com/id/1143045815/photo/blurred-bus-on-a-street-of-dallas.jpg?s=1024x1024&w=is&k=20&c=HZw6xGS1IdRIIL0Uz9jFoKOfFCJmlnI9T9DLiY0Bj9o=",
    icono: "🚌",
    descripcion: "Conecta el centro con el norte de Popayán. Ideal para estudiantes y trabajadores.",
    detalles: "Horarios: 6am-10pm. Paraderos: Parque Caldas, Terminal, Barrio Bolívar, etc.",
    barrios: ["Centro", "Norte", "Parque Caldas", "Bolívar", "Terminal"]
  },
  {
    nombre: "Ruta Sur - Universidades",
    imagen: "https://media.istockphoto.com/id/1316650493/photo/city-bus-in-motion.jpg?s=612x612&w=0&k=20&c=Jx2TkMvfvv-ukJGWH94xKy_eLCY2kH2g2kYB_hixlDc=",
    icono: "🎓",
    descripcion: "Llega fácil a las principales universidades y barrios del sur.",
    detalles: "Horarios: 5:30am-9:30pm. Paraderos: Unicauca, Campanario, Lomas, etc.",
    barrios: ["Sur", "Universidad", "Unicauca", "Campanario", "Lomas"]
  },
  {
    nombre: "Ruta Occidente - Empresas",
    imagen: "https://media.istockphoto.com/id/601385772/photo/bus-moves-on-city-street.jpg?s=612x612&w=0&k=20&c=7ckfQ1-4ivdEXCut8hA87M2lkLOp53JPpnFPaC0EEso=",
    icono: "🏢",
    descripcion: "Ideal para trabajadores y visitantes de la zona industrial y comercial.",
    detalles: "Horarios: 6am-8pm. Paraderos: Zona Franca, Centro Comercial, etc.",
    barrios: ["Occidente", "Zona Franca", "Centro Comercial", "Industrial"]
  },
  {
    nombre: "Ruta Oriente - Bello Horizonte",
    imagen: "https://media.istockphoto.com/id/2218187620/photo/city-blue-white-bus-rush-motion-blur-effect-through-the-streets-of-the-city-rush-hour.jpg?s=612x612&w=0&k=20&c=RxWY05bHiMI6wZM2Hl4T9abjPbsItyxmWRrg6bA_wxI=",
    icono: "🌄",
    descripcion: "Conecta el oriente de la ciudad con Bello Horizonte y barrios aledaños.",
    detalles: "Horarios: 6am-9pm. Paraderos: Bello Horizonte, La Paz, El Recuerdo.",
    barrios: ["Oriente", "Bello Horizonte", "La Paz", "El Recuerdo"]
  },
  {
    nombre: "Ruta Suroriente - Pandiguando",
    imagen: "https://media.istockphoto.com/id/1438334882/photo/city-bus-in-motion.jpg?s=612x612&w=0&k=20&c=9PNoILGziP2JcNuFyd4kUXHwkCfoub7HXFC3kVc3bjk=",
    icono: "🏘️",
    descripcion: "Ideal para quienes viven en Pandiguando y alrededores.",
    detalles: "Horarios: 5:30am-8:30pm. Paraderos: Pandiguando, La Esmeralda, La Paz.",
    barrios: ["Suroriente", "Pandiguando", "La Esmeralda", "La Paz"]
  },
  {
    nombre: "Ruta Norte - Villa del Norte",
    imagen: "https://media.istockphoto.com/id/1408227465/photo/modern-city-bus.jpg?s=612x612&w=0&k=20&c=waJ4OedjClivfUZ5VU8uPKCOLoZnXzagC3hJ4Xq4Q9A=",
    icono: "🏡",
    descripcion: "Llega fácil a Villa del Norte y barrios cercanos.",
    detalles: "Horarios: 6am-9pm. Paraderos: Villa del Norte, El Recuerdo, Centro.",
    barrios: ["Norte", "Villa del Norte", "El Recuerdo", "Centro"]
  },
  {
    nombre: "Ruta Sur - La Paz",
    imagen: "https://media.istockphoto.com/id/2213857574/photo/tourist-bus-driving-moving-turn-on-the-left-at-high-motion-blur-effect-speed-on-a-street-in.jpg?s=612x612&w=0&k=20&c=pahd_nefhgBk_wL2HLDhTLUOpXj1aW_g6VfcP9hgB3Y=",
    icono: "🌳",
    descripcion: "Conecta el sur con el barrio La Paz y zonas verdes.",
    detalles: "Horarios: 6am-8pm. Paraderos: La Paz, Campanario, Lomas.",
    barrios: ["Sur", "La Paz", "Campanario", "Lomas"]
  },
  {
    nombre: "Ruta Centro - Pandiguando",
    imagen: "https://media.istockphoto.com/id/1143045815/photo/blurred-bus-on-a-street-of-dallas.jpg?s=1024x1024&w=is&k=20&c=HZw6xGS1IdRIIL0Uz9jFoKOfFCJmlnI9T9DLiY0Bj9o=",
    icono: "🚏",
    descripcion: "Del centro a Pandiguando y barrios intermedios.",
    detalles: "Horarios: 6am-8pm. Paraderos: Centro, Pandiguando, La Esmeralda.",
    barrios: ["Centro", "Pandiguando", "La Esmeralda"]
  },
];

const paraderosEmpresas = [
  {
    nombre: "Paradero Central",
    icono: "📍",
    descripcion: "Ubicado en el corazón de Popayán, conecta con todas las rutas principales.",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Parque_Caldas_Popayan.jpg", // Parque Caldas, centro
    ubicacion: { lat: 2.4429, lon: -76.6069 },
    mapUrl: "https://maps.app.goo.gl/uog51PcfKYXAkvs77",
    tipo: "paradero",
    color: "#ff9800",
    estadistica: "+30 paraderos"
  },
  {
    nombre: "Empresa Sotracauca",
    icono: "🚌",
    descripcion: "Transporte seguro y confiable para todos los ciudadanos.",
    imagen: "https://www.popayan.gov.co/NuestraAlcaldia/SaladePrensa/PublishingImages/Paginas/Inicia-la-operaci%C3%B3n-de-la-primera-fase-de-la-Estaci%C3%B3n-de-Integraci%C3%B3n-Norte-del-SETP-Ciudad-Blanca/Movilidad%20-%20Estaci%C3%B3n%20Calle%2053%20(4).jpg", // Bus Sotracauca
    ubicacion: { lat: 2.45313, lon: -76.59812 },
    mapUrl: "https://maps.app.goo.gl/B6niMQ2MQcnMCuBUA",
    tipo: "empresa",
    color: "#2196f3",
    estadistica: "5 empresas aliadas"
  },
  {
    nombre: "Empresa Pubenza",
    icono: "🚍",
    descripcion: "Amplia cobertura y horarios flexibles para tu comodidad.",
    imagen: "https://www.popayan.gov.co/SecretariasyEntidades/SecMujer/SaladePrensa/PublishingImages/PAGINAS/2000%20PASAJE.png", // Bus Pubenza
    ubicacion: { lat: 2.46413, lon: -76.59898 },
    mapUrl: "https://maps.app.goo.gl/f7soomFghGmziPV87",
    tipo: "empresa",
    color: "#4caf50",
    estadistica: "Cobertura 95% ciudad"
  },
];

const estadisticas = [
  { texto: "+30 paraderos", icono: "📍" },
  { texto: "5 empresas aliadas", icono: "🚌" },
  { texto: "Cobertura 95% ciudad", icono: "🌎" },
];

const testimonios = [
  { nombre: "Juan P.", texto: "¡Ahora llego puntual a mi trabajo! RouWhite me facilita la vida.", estrellas: 5, destacado: "¡Ahora llego puntual a mi trabajo!", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { nombre: "María G.", texto: "Fácil de usar y muy útil para saber qué bus tomar.", estrellas: 4, destacado: "Fácil de usar y muy útil", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { nombre: "Andrés L.", texto: "La información siempre está actualizada, lo recomiendo.", estrellas: 5, destacado: "Información siempre actualizada", avatar: "https://randomuser.me/api/portraits/men/65.jpg" },
];

function MiniMapa({ lat, lon, nombre, mapUrl, onClose }) {
  // OpenStreetMap Static
  const osmUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=${lat},${lon}&zoom=15&size=400x200&markers=${lat},${lon},red-pushpin`;
  const googleMapsUrl = mapUrl || `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
  const [imgError, setImgError] = useState(false);
  return (
    <div className="modal-mapa-overlay" onClick={onClose}>
      <div className="modal-mapa" onClick={e => e.stopPropagation()}>
        <h4>{nombre}</h4>
        {!imgError ? (
          <img
            src={osmUrl}
            alt="Mapa ubicación"
            onError={() => setImgError(true)}
            style={{ borderRadius: '8px', marginBottom: '1rem', width: '100%', maxWidth: 400, height: 200, objectFit: 'cover' }}
          />
        ) : (
          <div style={{ margin: '1rem 0', color: '#d65a00', fontWeight: 500 }}>
            No se pudo cargar el mapa.<br />
            <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#2196f3', textDecoration: 'underline' }}>
              Ver en Google Maps
            </a>
          </div>
        )}
        <Button onClick={onClose}>Cerrar</Button>
      </div>
    </div>
  );
}

function ModalOpinion({ onClose, onSubmit }) {
  const [nombre, setNombre] = useState("");
  const [texto, setTexto] = useState("");
  const [estrellas, setEstrellas] = useState(5);
  return (
    <div className="modal-opinion-overlay" onClick={onClose}>
      <div className="modal-opinion" onClick={e => e.stopPropagation()}>
        <h4>Deja tu opinión</h4>
        <input placeholder="Tu nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <textarea placeholder="¿Qué opinas de RouWhite?" value={texto} onChange={e => setTexto(e.target.value)} />
        <div className="modal-opinion-estrellas">
          {[1,2,3,4,5].map(n => (
            <span key={n} className={n <= estrellas ? "estrella-activa" : ""} onClick={() => setEstrellas(n)}>⭐</span>
          ))}
        </div>
        <button onClick={() => { onSubmit({ nombre, texto, estrellas, avatar: "https://randomuser.me/api/portraits/lego/1.jpg" }); onClose(); }}>Enviar</button>
        <button className="modal-opinion-cerrar" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

function CarruselTestimonios({ testimonios }) {
  const [actual, setActual] = useState(0);
  const timeoutRef = useRef(null);
  useEffect(() => {
    timeoutRef.current = setTimeout(() => setActual((actual+1)%testimonios.length), 6000);
    return () => clearTimeout(timeoutRef.current);
  }, [actual, testimonios.length]);
  return (
    <div className="carrusel-testimonios">
      <button className="carrusel-flecha" onClick={() => setActual((actual-1+testimonios.length)%testimonios.length)}>&lt;</button>
      <div className="testimonio-card-glass">
        <img className="testimonio-avatar" src={testimonios[actual].avatar} alt={testimonios[actual].nombre} />
        <div className="testimonio-estrellas">
          {Array.from({ length: testimonios[actual].estrellas }).map((_, i) => (
            <span key={i} className="estrella-animada">⭐</span>
          ))}
        </div>
        <p className="testimonio-destacado">"{testimonios[actual].destacado}"</p>
        <p>{testimonios[actual].texto}</p>
        <span>- {testimonios[actual].nombre}</span>
      </div>
      <button className="carrusel-flecha" onClick={() => setActual((actual+1)%testimonios.length)}>&gt;</button>
    </div>
  );
}

function FAQItem({ pregunta, respuesta }) {
  const [abierto, setAbierto] = React.useState(false);
  return (
    <div className={`faq-item-glass${abierto ? ' abierto' : ''}`} onClick={() => setAbierto(!abierto)}>
      <div className="faq-pregunta">{pregunta}</div>
      <div className="faq-respuesta" style={{ display: abierto ? 'block' : 'none' }}>{respuesta}</div>
    </div>
  );
}

// Animación de conteo para los números de impacto
function useContadorImpacto(ref, valorFinal) {
  React.useEffect(() => {
    if (!ref.current) return;
    let start = 0;
    const end = parseInt(valorFinal.replace(/\D/g, "")) || 0;
    if (isNaN(end) || end === 0) return;
    let current = start;
    const duration = 1200;
    const stepTime = Math.max(Math.floor(duration / end), 20);
    const timer = setInterval(() => {
      current += Math.ceil(end / (duration / stepTime));
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      ref.current.textContent = valorFinal.includes("M") ? `+${(current/1000000).toFixed(1)}M` : valorFinal.includes("%") ? `${current}%` : `+${current.toLocaleString()}`;
    }, stepTime);
    return () => clearInterval(timer);
  }, [valorFinal, ref]);
}

// En la sección de indicadores de impacto:
function ImpactoNumero({ valor }) {
  const ref = React.useRef();
  useContadorImpacto(ref, valor);
  return <span className="impacto-numero" ref={ref}>{valor}</span>;
}

function ModalReserva({ ruta, onClose, onConfirm }) {
  const [nombre, setNombre] = React.useState("");
  const [cantidad, setCantidad] = React.useState(1);
  return (
    <div className="modal-opinion-overlay" onClick={onClose}>
      <div className="modal-opinion" onClick={e => e.stopPropagation()}>
        <h4>Reservar cupo en {ruta.nombre}</h4>
        <input placeholder="Tu nombre" value={nombre} onChange={e => setNombre(e.target.value)} />
        <input type="number" min="1" max="10" value={cantidad} onChange={e => setCantidad(Number(e.target.value))} />
        <button onClick={() => { onConfirm(nombre, cantidad); onClose(); }}>Reservar</button>
        <button className="modal-opinion-cerrar" onClick={onClose}>Cancelar</button>
      </div>
    </div>
  );
}

function ModalDetallesBus({ ruta, onClose }) {
  // Datos simulados
  const detalles = {
    placa: "ABC-123",
    conductor: "Carlos Gómez",
    modelo: "Chevrolet NPR 2022",
    foto: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&auto=format&fit=crop&q=60",
    empresa: "Transtambo",
    telefono: "312 345 6789"
  };
  return (
    <div className="modal-opinion-overlay" onClick={onClose}>
      <div className="modal-opinion" onClick={e => e.stopPropagation()}>
        <h4>Detalles del bus</h4>
        <img src={detalles.foto} alt="Bus" style={{width: '100%', borderRadius: 8, marginBottom: 8}} />
        <div><b>Placa:</b> {detalles.placa}</div>
        <div><b>Conductor:</b> {detalles.conductor}</div>
        <div><b>Modelo:</b> {detalles.modelo}</div>
        <div><b>Empresa:</b> {detalles.empresa}</div>
        <div><b>Teléfono:</b> {detalles.telefono}</div>
        <button className="modal-opinion-cerrar" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

function Inicio() {
  const [busqueda, setBusqueda] = useState("");
  const [expandida, setExpandida] = useState(null);
  const [modalMapa, setModalMapa] = useState(null);
  const [modalOpinion, setModalOpinion] = useState(false);
  const [modalReserva, setModalReserva] = useState(null);
  const [modalDetallesBus, setModalDetallesBus] = useState(null);
  const [opiniones, setOpiniones] = useState(testimonios);
  const [resultados, setResultados] = useState([]);
  const [mensajeBusqueda, setMensajeBusqueda] = useState("");
  const [modoOscuro, setModoOscuro] = useState(false);
  const [sugerencias] = useState(["Centro", "Universidad", "Terminal", "Campanario", "Zona Franca", "Bello Horizonte", "Pandiguando", "Villa del Norte", "La Paz", "El Recuerdo", "La Esmeralda"]);
  const [sugerenciasFiltradas, setSugerenciasFiltradas] = useState([]);
  const [contadorBusquedas, setContadorBusquedas] = useState(0);
  const [alerta, setAlerta] = useState("Tráfico moderado en el centro. ¡Planifica tu viaje!");
  const [mensajeReserva, setMensajeReserva] = useState("");
  const reconocimientoVozRef = useRef(null);

  const agregarOpinion = (opinion) => setOpiniones([...opiniones, opinion]);

  const toggleModoOscuro = () => setModoOscuro(m => !m);

  const handleVoz = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Tu navegador no soporta reconocimiento de voz.');
      return;
    }
    if (!reconocimientoVozRef.current) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.onresult = (event) => {
        setBusqueda(event.results[0][0].transcript);
      };
      reconocimientoVozRef.current = recognition;
    }
    reconocimientoVozRef.current.start();
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    setContadorBusquedas(c => c + 1);
    if (!busqueda.trim()) {
      setMensajeBusqueda("Por favor, ingresa un destino o ruta.");
      setResultados([]);
      return;
    }
    const filtro = rutas.filter(r =>
      r.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
      r.descripcion.toLowerCase().includes(busqueda.toLowerCase()) ||
      (r.barrios && r.barrios.some(b => b.toLowerCase().includes(busqueda.toLowerCase())))
    );
    if (filtro.length === 0) {
      setMensajeBusqueda("No se encontraron rutas para tu búsqueda.");
    } else {
      setMensajeBusqueda("");
    }
    setResultados(filtro);
  };

  useEffect(() => {
    document.body.classList.toggle('modo-oscuro', modoOscuro);
  }, [modoOscuro]);

  const handleInputChange = (e) => {
    setBusqueda(e.target.value);
    if (e.target.value.trim().length > 0) {
      const filtro = sugerencias.filter(s => s.toLowerCase().includes(e.target.value.toLowerCase()));
      setSugerenciasFiltradas(filtro);
    } else {
      setSugerenciasFiltradas([]);
    }
  };

  return (
    <>
      {/* <Header /> */}
      {/* HERO MODERNO */}
      <section className="hero-bg-mapa">
        <div className="hero-content-modern">
          <div className="hero-iconos-transporte">
            <span role="img" aria-label="bus">🚌</span>
            <span role="img" aria-label="paradero">📍</span>
            <span role="img" aria-label="mapa">🗺️</span>
          </div>
          <button className="modo-oscuro-toggle" onClick={toggleModoOscuro} title="Modo claro/oscuro">
            {modoOscuro ? '🌙' : '☀️'}
          </button>
          {alerta && <div className="hero-alerta">{alerta}</div>}
          <h1 className="hero-title-glass">¡Bienvenido a <span>RouWhite</span>!</h1>
          <p className="hero-subtitle-glass">La plataforma digital para moverte fácil y seguro por Popayán.</p>
          <form className="hero-busqueda-glass" onSubmit={handleBuscar} autoComplete="off">
            <input
              type="text"
              placeholder="¿A dónde quieres ir? Busca tu ruta..."
              value={busqueda}
              onChange={handleInputChange}
              list="sugerencias-rw"
              autoComplete="off"
            />
            <datalist id="sugerencias-rw">
              {sugerencias.map((s, i) => <option key={i} value={s} />)}
            </datalist>
            <Button type="submit">Buscar</Button>
            <Button type="button" className="btn-voz" onClick={handleVoz} title="Buscar por voz">🎤</Button>
          </form>
          {busqueda && sugerenciasFiltradas.length > 0 && (
            <div className="buscador-autocompletado">
              {sugerenciasFiltradas.map((s, i) => (
                <div
                  key={i}
                  className="sugerencia-autocompletar"
                  onClick={() => { setBusqueda(s); setSugerenciasFiltradas([]); }}
                >
                  <span className="chip-barrio">{s}</span>
                </div>
              ))}
            </div>
          )}
          <div className="hero-sugerencias">
            {sugerencias.map((s, i) => (
              <span key={i} className="chip-barrio" onClick={() => setBusqueda(s)}>{s}</span>
            ))}
          </div>
          <div className="hero-logro">{contadorBusquedas > 0 && `¡Has buscado ${contadorBusquedas} ruta${contadorBusquedas > 1 ? 's' : ''}!`}</div>
          <div className="hero-frase-inspiradora">¡Empieza tu viaje ahora!</div>
          <div className="hero-carrusel-recomendadas">
            <span>Rutas recomendadas:</span>
            <div className="carrusel-recomendadas-lista">
              {rutas.slice(0, 3).map((ruta, idx) => (
                <div className="carrusel-recomendada-card" key={idx}>
                  <span className="carrusel-recomendada-icono">{ruta.icono}</span>
                  <span className="carrusel-recomendada-nombre">{ruta.nombre}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RESULTADOS DE BÚSQUEDA */}
      {mensajeBusqueda && (
        <div className="busqueda-mensaje-llamativa">
          {mensajeBusqueda === "No se encontraron rutas para tu búsqueda." ? (
            <>
              <span role="img" aria-label="ups">😕</span> <b>¡Ups!</b> No encontramos rutas para "{busqueda}".<br />
              <span>¿Quizás quisiste buscar:</span>
              <div className="busqueda-sugerencias-populares">
                {sugerencias.map((s, i) => (
                  <button key={i} className="sugerencia-btn" onClick={() => setBusqueda(s)}>{s}</button>
                ))}
              </div>
              <button className="ver-todas-btn" onClick={() => { setResultados(rutas); setMensajeBusqueda(""); }}>Ver todas las rutas disponibles</button>
              <div className="busqueda-mensaje-amigable">¡Estamos mejorando cada día! Prueba con otro destino o revisa nuestras rutas populares.</div>
              <div className="busqueda-sugerir">¿No encuentras tu barrio? <a href="#">Sugiere una nueva ruta</a></div>
            </>
          ) : (
            <>
              <span role="img" aria-label="bus">🚌</span> <b>¡Listo!</b> {resultados.length > 0 ? `Encontramos ${resultados.length} ruta${resultados.length > 1 ? 's' : ''} para ti:` : mensajeBusqueda}
            </>
          )}
        </div>
      )}
      {resultados.length > 0 && (
        <section className="galeria-carrusel-section animacion-entrada-resultados">
          <h2 className="galeria-title-modern">
            <span role="img" aria-label="check">✅</span> ¡Estas son las mejores rutas para ti!
          </h2>
          {mensajeReserva && <div className="mensaje-exito-reserva">{mensajeReserva}</div>}
          <div className="galeria-carrusel">
            {resultados.map((ruta, idx) => {
              // Datos simulados para la demo
              const proximaSalida = ["2:30 PM", "3:00 PM", "3:15 PM"][idx % 3];
              const pasajeros = Math.floor(Math.random() * 30) + 5;
              const cupos = 20 - (pasajeros % 20);
              const trafico = [
                { estado: "Bajo", color: "#4caf50", icono: "🟢" },
                { estado: "Moderado", color: "#ffeb3b", icono: "🟡" },
                { estado: "Alto", color: "#f44336", icono: "🔴" }
              ][idx % 3];
              const tiempoLlegada = 10 + (idx * 5);
              const estadoBus = [
                { limpio: true, aire: true },
                { limpio: true, aire: false },
                { limpio: false, aire: true }
              ][idx % 3];
              const paraderos = ruta.barrios ? ruta.barrios.slice(0, 3).join(", ") : "-";
              // Coordenadas simuladas para el mapa
              const coords = [
                { lat: 2.4429, lon: -76.6069 },
                { lat: 2.45313, lon: -76.59812 },
                { lat: 2.46413, lon: -76.59898 }
              ][idx % 3];
              return (
                <div className="recomendacion-card-inteligente animacion-entrada-recomendacion" key={idx}>
                  <div className="recomendacion-img-wrap">
                    <img
                      src={ruta.imagen}
                      alt={ruta.nombre}
                      onError={e => { e.target.onerror = null; e.target.src = "https://placehold.co/420x180?text=Sin+foto"; }}
                    />
                  </div>
                  <div className="recomendacion-header">
                    <span className="recomendacion-icono">{ruta.icono}</span>
                    <h3>¡Te sirve la <b>{ruta.nombre}</b>!</h3>
                  </div>
                  <div className="recomendacion-datos">
                    <div><span role="img" aria-label="salida">🕒</span> <b>Próxima salida:</b> {proximaSalida}</div>
                    <div><span role="img" aria-label="pasajeros">👤</span> <b>Pasajeros actuales:</b> {pasajeros}</div>
                    <div><span role="img" aria-label="cupos">🪑</span> <b>Cupos disponibles:</b> <span style={{color: cupos <= 5 ? '#f44336' : '#4caf50', fontWeight: 600}}>{cupos}</span> {cupos <= 5 && <span title="¡Pocos cupos!" style={{marginLeft:4}}>⚠️</span>}</div>
                    <div><span role="img" aria-label="trafico">🚦</span> <b>Tráfico:</b> <span style={{color: trafico.color}}>{trafico.icono} {trafico.estado}</span></div>
                    <div><span role="img" aria-label="paraderos">📍</span> <b>Paraderos cercanos:</b> {paraderos}</div>
                    <div><span role="img" aria-label="tiempo">⏱️</span> <b>Tiempo estimado de llegada:</b> {tiempoLlegada} min</div>
                    <div><span role="img" aria-label="bus">🚌</span> <b>Estado del bus:</b> {estadoBus.limpio ? <span style={{color:'#4caf50'}}>🟢 Limpio</span> : <span style={{color:'#f44336'}}>🔴 Sucio</span>}, {estadoBus.aire ? <span style={{color:'#4caf50'}}>🟢 Aire acondicionado</span> : <span style={{color:'#f44336'}}>🔴 Sin aire</span>}</div>
                  </div>
                  <div className="recomendacion-botones">
                    <Button onClick={() => setModalMapa({ lat: coords.lat, lon: coords.lon, nombre: ruta.nombre, onClose: () => setModalMapa(null) })}>Ver en mapa</Button>
                    <Button onClick={() => setModalReserva({ ruta })}>Reservar cupo</Button>
                    <Button onClick={() => setModalDetallesBus({ ruta })}>Ver detalles del bus</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* GALERÍA DE RUTAS - GLASSMORPHISM + CARRUSEL */}
      <section className="galeria-carrusel-section">
        <h2 className="galeria-title-modern">Rutas y buses de Popayán</h2>
        <div className="galeria-carrusel">
          {rutas.map((ruta, idx) => (
            <div className="galeria-card-glass" key={idx}>
              <div className="galeria-card-img-wrap">
                <img
                  src={ruta.imagen}
                  alt={ruta.nombre}
                  onError={e => { e.target.onerror = null; e.target.src = "https://placehold.co/420x320?text=Imagen+no+disponible"; }}
                />
                <div className="galeria-card-icon">{ruta.icono}</div>
              </div>
              <div className="galeria-card-info">
                <h3>{ruta.nombre}</h3>
                <p>{ruta.descripcion}</p>
                <Button onClick={() => setExpandida(idx === expandida ? null : idx)}>
                  {expandida === idx ? "Ocultar info" : "Ver más"}
                </Button>
                {expandida === idx && (
                  <div className="galeria-card-detalles">
                    <p>{ruta.detalles}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALERÍA DE LA CIUDAD */}
      <section className="galeria-carrusel-section">
        <h2 className="galeria-title-modern">Galería de la Ciudad</h2>
        <div className="galeria-carrusel">
          {[
            "https://media.istockphoto.com/id/1143045815/photo/blurred-bus-on-a-street-of-dallas.jpg?s=1024x1024&w=is&k=20&c=HZw6xGS1IdRIIL0Uz9jFoKOfFCJmlnI9T9DLiY0Bj9o=",
            "https://media.istockphoto.com/id/1316650493/photo/city-bus-in-motion.jpg?s=612x612&w=0&k=20&c=Jx2TkMvfvv-ukJGWH94xKy_eLCY2kH2g2kYB_hixlDc=",
            "https://media.istockphoto.com/id/601385772/photo/bus-moves-on-city-street.jpg?s=612x612&w=0&k=20&c=7ckfQ1-4ivdEXCut8hA87M2lkLOp53JPpnFPaC0EEso=",
            "https://media.istockphoto.com/id/2218187620/photo/city-blue-white-bus-rush-motion-blur-effect-through-the-streets-of-the-city-rush-hour.jpg?s=612x612&w=0&k=20&c=RxWY05bHiMI6wZM2Hl4T9abjPbsItyxmWRrg6bA_wxI="
          ].map((img, i) => (
            <div className="galeria-card-glass" key={i} style={{maxWidth:220,minWidth:180}}>
              <div className="galeria-card-img-wrap">
                <img
                  src={img}
                  alt={`Popayán galería ${i + 1}`}
                  onError={e => { e.target.onerror = null; e.target.src = "https://placehold.co/220x180?text=Sin+foto"; }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PARADEROS Y EMPRESAS INTERACTIVO */}
      <section className="paraderos-empresas-section">
        <h2>Paraderos y Empresas</h2>
        <div className="paraderos-empresas-lista">
          {paraderosEmpresas.map((item, idx) => (
            <div
              className="paradero-card-glass paradero-animado"
              key={idx}
              style={{ borderTop: `4px solid ${item.color}` }}
              onMouseEnter={e => e.currentTarget.classList.add('paradero-hover')}
              onMouseLeave={e => e.currentTarget.classList.remove('paradero-hover')}
            >
              <span className="paradero-icono-animado" style={{ color: item.color }}>{item.icono}</span>
              <h3 style={{ color: item.color }}>{item.nombre}</h3>
              <p>{item.descripcion}</p>
              <Button onClick={() => setModalMapa(item)}>Ver ubicación</Button>
            </div>
          ))}
        </div>
        <div className="paraderos-estadisticas">
          {estadisticas.map((e, i) => (
            <div className="paradero-estadistica" key={i}>
              <span>{e.icono}</span>
              <span>{e.texto}</span>
            </div>
          ))}
        </div>
        <div className="separador-svg">
          <svg width="100%" height="40" viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h1440v40H0V0z" fill="url(#paint0_linear)"/><defs><linearGradient id="paint0_linear" x1="0" y1="0" x2="1440" y2="40" gradientUnits="userSpaceOnUse"><stop stopColor="#ffecd2"/><stop offset="1" stopColor="#fcb69f"/></linearGradient></defs></svg>
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section className="sobre-nosotros-section">
        <h2 className="sobre-nosotros-title">Sobre Nosotros</h2>
        <p className="sobre-nosotros-desc">
          Somos RouWhite, una plataforma digital que conecta a las personas con su ciudad y mejora la movilidad urbana en Popayán.
        </p>
        <div className="sobre-nosotros-valores">
          <div className="valor-card-glass">
            <span className="valor-icono">🚀</span>
            <h3>Innovación</h3>
          </div>
          <div className="valor-card-glass">
            <span className="valor-icono">🤝</span>
            <h3>Confianza</h3>
          </div>
          <div className="valor-card-glass">
            <span className="valor-icono">🚌</span>
            <h3>Servicio</h3>
          </div>
          <div className="valor-card-glass">
            <span className="valor-icono">🌱</span>
            <h3>Sostenibilidad</h3>
          </div>
        </div>
        <div style={{textAlign:'center',marginTop:'1.5rem'}}>
          <Button href="/Nosotros">Conoce más sobre nosotros</Button>
        </div>
      </section>

      {/* CONTACTO */}
      <section className="contacto-section">
        <h2>Contacto</h2>
        <p>¿Tienes dudas o sugerencias? ¡Contáctanos!</p>
        <ul className="contacto-lista">
          <li>Email: <a href="mailto:contacto@rouwhite.com">contacto@rouwhite.com</a></li>
          <li>Teléfono: 123 456 7890</li>
          <li>WhatsApp: <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer">+57 300 123 4567</a></li>
          <li>Instagram: <a href="https://instagram.com/rouwhite" target="_blank" rel="noopener noreferrer">@rouwhite</a></li>
        </ul>
      </section>

      {/* INDICADORES DE IMPACTO */}
      <section className="impacto-section">
        <div className="impacto-grid">
          <div className="impacto-card-glass">
            <ImpactoNumero valor="+10,000" />
            <span className="impacto-label">Usuarios activos</span>
          </div>
          <div className="impacto-card-glass">
            <ImpactoNumero valor="+1M" />
            <span className="impacto-label">Viajes realizados</span>
          </div>
          <div className="impacto-card-glass">
            <ImpactoNumero valor="100%" />
            <span className="impacto-label">Cobertura Popayán</span>
          </div>
        </div>
      </section>

      {/* LLAMADO A LA ACCIÓN DESTACADO */}
      <section className="cta-section">
        <div className="cta-card-glass">
          <h2>¿Listo para moverte fácil por Popayán?</h2>
          <p>Descarga nuestra app y empieza a planificar tu viaje hoy mismo.</p>
          <Button href="#">Descargar App</Button>
        </div>
      </section>

      {/* ALIADOS/CLIENTES */}
      <section className="aliados-section">
        <h2 className="aliados-title">Nuestros Aliados</h2>
        <div className="aliados-grid">
          {/* Mostrar aliados con nombre */}
          {[
            { nombre: "Sotracauca", img: "/popayan/bussotracaucametro.jpg" },
            { nombre: "Transpubenza", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDy9Y0xgtVJxRRjvrICPvNMasfKRGa9xfZ7Q&s" },
            { nombre: "Translibertad", img: "https://www.popayan.gov.co/NuestraAlcaldia/SaladePrensa/PublishingImages/Paginas/Inicia-la-operaci%C3%B3n-de-la-primera-fase-de-la-Estaci%C3%B3n-de-Integraci%C3%B3n-Norte-del-SETP-Ciudad-Blanca/Movilidad%20-%20Estaci%C3%B3n%20Calle%2053%20(4).jpg" },
            { nombre: "Transtambo", img: "https://www.popayan.gov.co/SecretariasyEntidades/SecMujer/SaladePrensa/PublishingImages/PAGINAS/2000%20PASAJE.png" },
          ].map((aliado, idx) => (
            <div key={idx} style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
              <img src={aliado.img} alt={aliado.nombre} onError={e => { e.target.onerror = null; e.target.src = "https://placehold.co/120x80?text=No+disponible"; }} />
              <span style={{marginTop:'0.5rem',fontWeight:600,fontSize:'1.08rem'}}>{aliado.nombre}</span>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIOS CARRUSEL Y FORMULARIO */}
      <section className="testimonios-section-glass">
        <h2>Lo que dicen nuestros usuarios</h2>
        <CarruselTestimonios testimonios={opiniones} />
        <Button onClick={() => setModalOpinion(true)}>Deja tu opinión</Button>
      </section>

      {/* MODALES */}
      {modalMapa && <MiniMapa {...modalMapa} onClose={() => setModalMapa(null)} />}
      {modalOpinion && <ModalOpinion onClose={() => setModalOpinion(false)} onSubmit={agregarOpinion} />}
      {modalReserva && <ModalReserva ruta={modalReserva.ruta} onClose={() => setModalReserva(null)} onConfirm={(nombre, cantidad) => setMensajeReserva(`¡Reserva exitosa para ${nombre} (${cantidad>1?'s':''})!`)} />}
      {modalDetallesBus && <ModalDetallesBus ruta={modalDetallesBus.ruta} onClose={() => setModalDetallesBus(null)} />}

      {/* FOOTER MODERNO */}
      <Footer />
    </>
  );
}

export default Inicio;
export { FAQItem, ImpactoNumero };


