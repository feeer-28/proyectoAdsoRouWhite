// src/pages/Rutas.jsx
import React, { useState } from "react";
import "../assets/rutas.css";
import { FaBus, FaMapMarkerAlt, FaClock, FaSearchPlus, FaStar, FaRegStar, FaMapMarkedAlt, FaInfoCircle, FaBusAlt } from "react-icons/fa";

const rutasEjemplo = [
  {
    nombre: "Ruta 1 - Centro Histórico",
    descripcion: "Recorre los principales puntos turísticos y culturales del centro de la ciudad.",
    descripcionLarga: "Esta ruta conecta los lugares más emblemáticos del centro histórico de Popayán, ideal para turistas y residentes que desean explorar la riqueza cultural de la ciudad. Incluye paradas en museos, plazas y el terminal principal.",
    paraderos: ["Plaza Mayor", "Museo Central", "Parque Bolívar", "Terminal de Buses"],
    horario: "6:00 am - 10:00 pm",
    tipo: "Turística",
    tips: ["Ideal para turistas.", "Cercano a restaurantes y cafés.", "Frecuencia cada 15 minutos."],
    imagen: "https://media.istockphoto.com/id/1143045815/photo/blurred-bus-on-a-street-of-dallas.jpg?s=1024x1024&w=is&k=20&c=HZw6xGS1IdRIIL0Uz9jFoKOfFCJmlnI9T9DLiY0Bj9o=",
    mapUrl: "https://maps.app.goo.gl/uog51PcfKYXAkvs77"
  },
  {
    nombre: "Ruta 2 - Zona Universitaria",
    descripcion: "Conecta las universidades y centros educativos con barrios residenciales.",
    descripcionLarga: "Pensada para estudiantes y docentes, esta ruta une las principales universidades y bibliotecas con zonas residenciales y deportivas. Es una de las rutas más concurridas en horas pico.",
    paraderos: ["Universidad Nacional", "Biblioteca Pública", "Barrio Jardín", "Estadio"],
    horario: "5:30 am - 9:30 pm",
    tipo: "Universitaria",
    tips: ["Alta demanda en la mañana.", "Cercano a zonas deportivas.", "Frecuencia cada 10 minutos."],
    imagen: "https://media.istockphoto.com/id/1316650493/photo/city-bus-in-motion.jpg?s=612x612&w=0&k=20&c=Jx2TkMvfvv-ukJGWH94xKy_eLCY2kH2g2kYB_hixlDc=",
    mapUrl: "https://maps.app.goo.gl/B6niMQ2MQcnMCuBUA"
  },
  {
    nombre: "Ruta 3 - Circuito Comercial",
    descripcion: "Ideal para quienes trabajan o hacen compras en la zona comercial de la ciudad.",
    descripcionLarga: "Esta ruta recorre los principales centros comerciales y mercados de Popayán, facilitando el acceso a zonas de compras y oficinas. Perfecta para trabajadores y visitantes frecuentes.",
    paraderos: ["Centro Comercial Norte", "Mercado Central", "Avenida 5", "Plaza de la Tecnología"],
    horario: "7:00 am - 8:00 pm",
    tipo: "Comercial",
    tips: ["Evita horas pico para mayor comodidad.", "Cercano a bancos y oficinas.", "Frecuencia cada 20 minutos."],
    imagen: "https://media.istockphoto.com/id/601385772/photo/bus-moves-on-city-street.jpg?s=612x612&w=0&k=20&c=7ckfQ1-4ivdEXCut8hA87M2lkLOp53JPpnFPaC0EEso=",
    mapUrl: "https://maps.app.goo.gl/f7soomFghGmziPV87"
  },
];

const galeria = [
  "/popayan/atardecer.jpg",
  "/popayan/catedral.jpg",
  "/popayan/puente.jpg",
  "/popayan/sanfrancisco.jpg"
];

function ModalRuta({ ruta, onClose, favorita, onFavorita }) {
  return (
    <div className="modal-imagen-overlay" onClick={onClose}>
      <div className="modal-imagen modal-ruta-detalles" onClick={e => e.stopPropagation()}>
        <img src={ruta.imagen} alt={ruta.nombre} style={{width:'100%',borderRadius:12,maxHeight:220,objectFit:'cover',marginBottom:16}} />
        <h2 style={{marginBottom:8}}>{ruta.nombre}</h2>
        <div style={{display:'flex',gap:8,alignItems:'center',marginBottom:8}}>
          <span className="badge-tipo-ruta">{ruta.tipo}</span>
          <span className="badge-horario"><FaClock style={{marginRight:4}} />{ruta.horario}</span>
          <button className="btn-favorita" onClick={onFavorita} title={favorita ? 'Quitar de favoritas' : 'Marcar como favorita'}>
            {favorita ? <FaStar color="#ff9800" /> : <FaRegStar color="#bbb" />}
          </button>
        </div>
        <p style={{marginBottom:12}}>{ruta.descripcionLarga}</p>
        <div style={{marginBottom:12}}>
          <FaMapMarkedAlt style={{marginRight:4}} /> <b>Paraderos:</b>
          <ul style={{margin:'6px 0 0 18px'}}>
            {ruta.paraderos.map((p,i) => <li key={i}>{p}</li>)}
          </ul>
        </div>
        <div style={{marginBottom:12}}>
          <FaInfoCircle style={{marginRight:4}} /> <b>Tips:</b>
          <ul style={{margin:'6px 0 0 18px'}}>
            {ruta.tips.map((t,i) => <li key={i}>{t}</li>)}
          </ul>
        </div>
        <div style={{marginBottom:16}}>
          <a href={ruta.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-mapa-ruta">Ver en Google Maps</a>
        </div>
        <button className="modal-imagen-cerrar" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
}

function Rutas() {
  const [modalRuta, setModalRuta] = useState(null);
  const [favoritas, setFavoritas] = useState([]);
  const handleFavorita = idx => {
    setFavoritas(favoritas => favoritas.includes(idx) ? favoritas.filter(f => f !== idx) : [...favoritas, idx]);
  };
  return (
    <div className="rutas-page">
      <section className="rutas-hero rutas-hero-naranja">
        <div className="rutas-hero-content">
          <div className="rutas-hero-icono-bus"><FaBus /></div>
          <h1>Explora las Rutas Urbanas de Popayán</h1>
          <p>Encuentra la mejor opción para moverte por la ciudad. Consulta horarios, paraderos y recomendaciones para un viaje seguro y eficiente.</p>
        </div>
        <div className="rutas-hero-img">
          <img src="/popayan/atardecer.jpg" alt="Atardecer en Popayán" />
        </div>
      </section>
      <h2 className="rutas-title">Rutas Disponibles</h2>
      <div className="rutas-list">
        {rutasEjemplo.map((ruta, idx) => (
          <div className="ruta-card animacion-entrada-recomendacion" key={idx}>
            <div className="ruta-card-img">
              <img src={ruta.imagen} alt={ruta.nombre} onError={e => { e.target.onerror = null; e.target.src = 'https://placehold.co/340x140?text=Sin+foto'; }} />
              <span className="ruta-card-icono-circulo"><FaBusAlt /></span>
              <span className="badge-tipo-ruta">{ruta.tipo}</span>
              <button className="btn-favorita-card" onClick={() => handleFavorita(idx)} title={favoritas.includes(idx) ? 'Quitar de favoritas' : 'Marcar como favorita'}>
                {favoritas.includes(idx) ? <FaStar color="#ff9800" /> : <FaRegStar color="#bbb" />}
              </button>
            </div>
            <h2>{ruta.nombre}</h2>
            <p className="ruta-desc">{ruta.descripcion}</p>
            <div className="ruta-info">
              <div className="ruta-paraderos">
                <FaMapMarkerAlt className="ruta-info-icon" /> <strong>Paraderos:</strong>
                <ul>
                  {ruta.paraderos.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="ruta-horario-badge">
                <FaClock /> {ruta.horario}
              </div>
            </div>
            <button className="boton-rutas" style={{marginTop:'1rem'}} onClick={() => setModalRuta({ruta,idx})}>Ver detalles</button>
          </div>
        ))}
      </div>
      <section className="rutas-galeria">
        <h2>Galería de la Ciudad</h2>
        <div className="rutas-galeria-lista">
          {galeria.map((img, i) => (
            <div className="rutas-galeria-item" key={i} onClick={() => setModalRuta(null)} style={{cursor:'zoom-in',position:'relative'}}>
              <img src={img} alt={`Popayán galería ${i + 1}`} />
              <span className="rutas-galeria-zoom"><FaSearchPlus /></span>
            </div>
          ))}
        </div>
      </section>
      <section className="rutas-contacto rutas-contacto-glass">
        <h2>¿Necesitas ayuda?</h2>
        <p>Contáctanos para resolver tus dudas sobre rutas, horarios o el sistema de transporte.</p>
        <a href="/contactos" className="rutas-contacto-btn">Ir a Contacto</a>
      </section>
      {modalRuta && <ModalRuta ruta={modalRuta.ruta} onClose={() => setModalRuta(null)} favorita={favoritas.includes(modalRuta.idx)} onFavorita={() => handleFavorita(modalRuta.idx)} />}
    </div>
  );
}

export default Rutas;
