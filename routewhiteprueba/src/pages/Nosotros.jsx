import "../assets/nosotros.css";

function Nosotros() {
  return (
    <div className="nosotros-page">
      <h1 className="nosotros-title">Sobre Nosotros</h1>
      <section className="nosotros-historia">
        <h2>Nuestra Historia</h2>
        <p>
          RouWhite nació en 2023 como respuesta a la necesidad de una movilidad urbana más eficiente y humana en Popayán. Nuestro equipo, apasionado por la tecnología y el bienestar ciudadano, decidió crear una plataforma que facilite el acceso a información de transporte público, conectando barrios, personas y oportunidades.
        </p>
      </section>
      <section className="nosotros-vision">
        <h2>Visión y Misión</h2>
        <ul>
          <li><b>Misión:</b> Mejorar la movilidad urbana de Popayán, haciendo el transporte público más accesible, confiable y sostenible para todos.</li>
          <li><b>Visión:</b> Ser la plataforma líder en movilidad inteligente en el suroccidente colombiano, inspirando ciudades más conectadas y humanas.</li>
        </ul>
      </section>
      <section className="nosotros-valores">
        <h2>Nuestros Valores</h2>
        <div className="sobre-nosotros-valores">
          <div className="valor-card-glass">
            <span className="valor-icono">🚀</span>
            <h3>Innovación</h3>
            <p>Buscamos nuevas formas de mejorar la movilidad y la experiencia del usuario.</p>
          </div>
          <div className="valor-card-glass">
            <span className="valor-icono">🤝</span>
            <h3>Confianza</h3>
            <p>Información clara, actualizada y transparente para todos los usuarios.</p>
          </div>
          <div className="valor-card-glass">
            <span className="valor-icono">🚌</span>
            <h3>Servicio</h3>
            <p>El usuario es el centro de todo lo que hacemos.</p>
          </div>
          <div className="valor-card-glass">
            <span className="valor-icono">🌱</span>
            <h3>Sostenibilidad</h3>
            <p>Promovemos el transporte público y el cuidado del medio ambiente.</p>
          </div>
        </div>
      </section>
      <section className="nosotros-logros">
        <h2>Logros e Impacto</h2>
        <ul className="nosotros-logros-lista">
          <li>+10,000 usuarios activos en Popayán</li>
          <li>+1 millón de viajes planificados</li>
          <li>100% de cobertura urbana</li>
          <li>Alianzas con las principales empresas de transporte</li>
        </ul>
      </section>
      <section className="nosotros-equipo">
        <h2>Nuestro Equipo</h2>
        <div className="sobre-nosotros-equipo">
          <div className="equipo-card-glass">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Juan Pérez" />
            <h4>Juan Pérez</h4>
            <span>Fundador</span>
          </div>
          <div className="equipo-card-glass">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="María Gómez" />
            <h4>María Gómez</h4>
            <span>Desarrolladora</span>
          </div>
          <div className="equipo-card-glass">
            <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Andrés López" />
            <h4>Andrés López</h4>
            <span>Diseñador UI/UX</span>
          </div>
        </div>
      </section>
      <section className="nosotros-faq">
        <h2>Preguntas Frecuentes</h2>
        <div className="faq-lista">
          <div className="faq-item-glass">
            <div className="faq-pregunta">¿RouWhite es gratis?</div>
            <div className="faq-respuesta">Sí, la plataforma es completamente gratuita para los usuarios.</div>
          </div>
          <div className="faq-item-glass">
            <div className="faq-pregunta">¿Cómo puedo sugerir una nueva ruta?</div>
            <div className="faq-respuesta">Puedes contactarnos por email o WhatsApp y estaremos felices de escuchar tus sugerencias.</div>
          </div>
          <div className="faq-item-glass">
            <div className="faq-pregunta">¿La información está actualizada?</div>
            <div className="faq-respuesta">Sí, trabajamos constantemente para mantener la información lo más actualizada posible.</div>
          </div>
        </div>
      </section>
      <section className="nosotros-contacto">
        <h2>Contacto</h2>
        <ul className="contacto-lista">
          <li>Email: <a href="mailto:contacto@rouwhite.com">contacto@rouwhite.com</a></li>
          <li>Teléfono: 123 456 7890</li>
          <li>WhatsApp: <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer">+57 300 123 4567</a></li>
          <li>Instagram: <a href="https://instagram.com/rouwhite" target="_blank" rel="noopener noreferrer">@rouwhite</a></li>
        </ul>
      </section>
    </div>
  );
}

export default Nosotros; 