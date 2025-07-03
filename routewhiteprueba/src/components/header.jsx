import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../assets/header.css";

function Logo() {
  return (
    <span className="header-logo-svg" aria-label="Logo RouWhite" role="img">
      {/* SVG temporal */}
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="18" cy="18" r="18" fill="#f97316"/>
        <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="18" fontFamily="Arial" dy=".3em">RW</text>
      </svg>
    </span>
  );
}

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false); // Cierra menú al cambiar de ruta
  }, [location.pathname]);

  return (
    <header className={`main-header${scrolled ? " scrolled" : ""}`}>
      <div className="header-logo" style={{cursor:'pointer'}} onClick={() => { window.scrollTo({top:0,behavior:'smooth'}); if(location.pathname === '/') window.location.reload(); }}>
        <Logo />
        <span className="header-logo-text">ROUWHITE</span>
      </div>
      <nav className={`header-nav${menuOpen ? " open" : ""}`} aria-label="Navegación principal">
        <Link to="/" className={location.pathname === "/" ? "active" : ""} onClick={e => { if(location.pathname === '/') { e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); window.location.reload(); } }}>INICIO</Link>
        <Link to="/nosotros" className={location.pathname === "/nosotros" ? "active" : ""}>NOSOTROS</Link>
        <Link to="/rutas" className={location.pathname === "/rutas" ? "active" : ""}>RUTAS</Link>
        <Link to="/paradas" className={location.pathname === "/paradas" ? "active" : ""}>PARADAS</Link>
        <Link to="/login" className={location.pathname === "/login" ? "active" : ""}>INICIAR SESIÓN</Link>
      </nav>
      <button
        className="header-menu-toggle"
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
        aria-controls="header-nav"
        onClick={() => setMenuOpen(m => !m)}
      >
        <span className="header-menu-icon">{menuOpen ? "✖" : "☰"}</span>
      </button>
    </header>
  );
}

export default Header;
