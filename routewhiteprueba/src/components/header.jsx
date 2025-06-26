import { FaBus, FaHome, FaSearch, FaRoute, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../assets/header.css";

function Header() {
  return (
    <header>
      <div className="header-top">
        <div className="logo">
          <FaBus className="logo-icon" />
          <h1>RouWhite</h1>
        </div>
      </div>
      <nav>
        <Link to="/">
          <FaHome className="nav-icon" />
          <span>Inicio</span>
        </Link>
        <Link to="/buscar">
          <FaSearch className="nav-icon" />
          <span>Buscar</span>
        </Link>
        <Link to="/rutas">
          <FaRoute className="nav-icon" />
          <span>Rutas</span>
        </Link>
        <Link to="/paradas">
          <FaMapMarkerAlt className="nav-icon" />
          <span>Paradas</span>
        </Link>
        <div className="auth-buttons">
          <Link to="/registro">
            <button>Registrarse</button>
          </Link>
          <Link to="/login">
            <button>Iniciar sesión</button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
