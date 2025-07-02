import "../assets/contactos.css";

function Contactos() {
  return (
    <div className="contactos-page">
      <h1 className="contactos-title">Contáctanos</h1>
      <div className="contactos-content">
        <section className="contactos-block">
          <h2>Información de Contacto</h2>
          <p>Email: info@rutasurbanas.com</p>
          <p>Teléfono: +57 123 456 7890</p>
          <p>Dirección: Calle 123 #45-67, Ciudad</p>
        </section>
        <section className="contactos-block">
          <h2>Formulario de Contacto</h2>
          <form className="contact-form">
            <input type="text" placeholder="Nombre" required />
            <input type="email" placeholder="Correo electrónico" required />
            <textarea placeholder="Mensaje" required />
            <button type="submit">Enviar</button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Contactos; 