import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/admin/sidebar/sidebarAdminX.css";
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
    <aside className="sidebar" aria-label="Menú de navegación administrador">
      <div className="sidebar-logo">RouWhite</div>
      <nav>
        <ul>
          <li>
            <button onClick={() => navigate("/administrador/dashboard")}>
              <span className="icon"><i className="fa-solid fa-house"></i></span>
              <span>Dashboard</span>
            </button>
          </li>

          <li className={`menu-parent ${menuOpen.rutas ? "open" : ""}`}>
            <span className="menu-toggle" onClick={() => toggleMenu("rutas")}>
              <span className="icon"><i className="fa-solid fa-bus"></i></span>
              <span>Rutas</span>
            </span>
            <ul className="submenu">
              <li>
                <button onClick={() => navigate("/administrador/listarR")}>
                  <span className="icon"><i className="fa-solid fa-list"></i></span>
                  <span>Listar Rutas</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/administrador/crearR")}>
                  <span className="icon"><i className="fa-solid fa-plus"></i></span>
                  <span>Crear Ruta</span>
                </button>
              </li>
            </ul>
          </li>

          <li className={`menu-parent ${menuOpen.paraderos ? "open" : ""}`}>
            <span className="menu-toggle" onClick={() => toggleMenu("paraderos")}>
              <span className="icon"><i className="fa-solid fa-location-dot"></i></span>
              <span>Paraderos</span>
            </span>
            <ul className="submenu">
              <li>
                <button onClick={() => navigate("/administrador/listarParaderos")}>
                  <span className="icon"><i className="fa-solid fa-list"></i></span>
                  <span>Listar Paraderos</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigate("/administrador/crearParadero")}>
                  <span className="icon"><i className="fa-solid fa-plus"></i></span>
                  <span>Crear Paraderos</span>
                </button>
              </li>
            </ul>
          </li>

          <li className={`menu-parent ${menuOpen.usuarios ? "open" : ""}`}>
            <span className="menu-toggle" onClick={() => toggleMenu("usuarios")}>
              <span className="icon"><i className="fa-solid fa-users"></i></span>
              <span>Usuarios</span>
            </span>
            <ul className="submenu">
              <li>
                <button>
                  <span className="icon"><i className="fa-solid fa-list"></i></span>
                  <span>Listado Usuarios</span>
                </button>
              </li>
              <li>
                <button>
                  <span className="icon"><i className="fa-solid fa-plus"></i></span>
                  <span>Crear Usuarios</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
