import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/sidebarAdminX.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function SidebarAdmin() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState({
    rutas: false,
    paraderos: false,
    usuarios: false
  });

  const toggleMenu = (key) => {
    setMenuOpen(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">RouWhite</div>
      <nav>
        <ul>
          <li>
            <button onClick={() => navigate("/admin/dashboard")}>
              <span className="icon"><i className="fa-solid fa-house"></i></span>
              Dashboard
            </button>
          </li>

          <li className={`menu-parent ${menuOpen.rutas ? "open" : ""}`}>
            <span className="menu-toggle" onClick={() => toggleMenu("rutas")}>
              <span className="icon"><i className="fa-solid fa-bus"></i></span>
              Rutas
            </span>
            <ul className="submenu">
              <li>
                <button onClick={() => navigate("/administrador/listarR")}>
                  <span className="icon"><i className="fa-solid fa-list"></i></span>
                  Listar Rutas
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/administrador/crearR")}>
                  <span className="icon"><i className="fa-solid fa-plus"></i></span>
                  Crear Ruta
                </button>
              </li>
            </ul>
          </li>

          <li className={`menu-parent ${menuOpen.paraderos ? "open" : ""}`}>
            <span className="menu-toggle" onClick={() => toggleMenu("paraderos")}>
              <span className="icon"><i className="fa-solid fa-location-dot"></i></span>
              Paraderos
            </span>
            <ul className="submenu">
              <li>
                <button onClick={() => navigate("/administrador/listarParaderos")}>
                  <span className="icon"><i className="fa-solid fa-list"></i></span>
                  Listar Paraderos
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/administrador/crearParadero")}>
                  <span className="icon"><i className="fa-solid fa-plus"></i></span>
                  Crear Paraderos
                </button>
              </li>
            </ul>
          </li>

          <li className={`menu-parent ${menuOpen.usuarios ? "open" : ""}`}>
            <span className="menu-toggle" onClick={() => toggleMenu("usuarios")}>
              <span className="icon"><i className="fa-solid fa-users"></i></span>
              Usuarios
            </span>
            <ul className="submenu">
              <li>
                <button>
                  <span className="icon"><i className="fa-solid fa-list"></i></span>
                  Listado Usuarios
                </button>
              </li>
              <li>
                <button>
                  <span className="icon"><i className="fa-solid fa-plus"></i></span>
                  Crear Usuarios
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
