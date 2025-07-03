import "../assets/footer.css";

function Footer() {
  return (
    <footer className="footer-pro">
      <div className="footer-main">
        <div className="footer-logo">RouWhite</div>
        <nav className="footer-links">
          <a href="#">Inicio</a>
          <a href="#">Rutas</a>
          <a href="#">Paraderos</a>
          <a href="#">Empresas</a>
          <a href="#">Contacto</a>
        </nav>
        <div className="footer-social">
          <a href="https://instagram.com/rouwhite" target="_blank" rel="noopener noreferrer" aria-label="Instagram">📸</a>
          <a href="https://wa.me/573001234567" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">💬</a>
        </div>
      </div>
      <div className="footer-copy">© {new Date().getFullYear()} RouWhite. Todos los derechos reservados.<br />Desarrollado por el grupo Sena</div>
    </footer>
  );
}

export default Footer;