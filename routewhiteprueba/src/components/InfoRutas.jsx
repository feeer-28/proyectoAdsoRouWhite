import "../assets/infoRutas.css";

function InfoRutas() {
  return (
    <section className="info-rutas-flotante">
      <div className="info-rutas-content">
        <h2>Información sobre Rutas de Buses</h2>
        <p>
          Descubre las rutas de buses más importantes de la ciudad, sus horarios, paraderos principales y recomendaciones para un viaje seguro y eficiente. Nuestra plataforma te permite consultar en tiempo real la ubicación de los buses y planificar tu trayecto de manera óptima.
        </p>
        <ul>
          <li><strong>Horarios actualizados</strong> para cada ruta.</li>
          <li><strong>Mapa interactivo</strong> de paraderos y recorridos.</li>
          <li><strong>Consejos de seguridad</strong> y recomendaciones para usuarios.</li>
        </ul>
      </div>
    </section>
  );
}

export default InfoRutas;