import { FaBus, FaHome, FaList, FaPlus } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { useState } from "react";
import "../assets/header.css";

function Header() {
  const [openMenu, setOpenMenu] = useState(null);

  const handleToggle = (index) => {
    setOpenMenu(openMenu === index ? null : index);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">RouWhite</div>
      <nav>
        <ul>
          <li>
            <a href="#">
              <span className="icon"><FaHome /></span>
              <span className="label">Dashboard</span>
            </a>
          </li>

          <li className={`menu-parent ${openMenu === 0 ? "open" : ""}`}>
            <span className="menu-toggle" onClick={() => handleToggle(0)}>
              <span className="icon"><FaBus /></span>
              <span className="label">Rutas</span>
            </span>
            <ul className="submenu">
              <li>
                <a href="#"><span className="icon"><FaList /></span> Listar Rutas</a>
              </li>
              <li>
                <a href="#"><span className="icon"><FaPlus /></span> Crear Ruta</a>
              </li>
            </ul>
          </li>

          <li className={`menu-parent ${openMenu === 1 ? "open" : ""}`}>
            <span className="menu-toggle" onClick={() => handleToggle(1)}>
              <span className="icon"><FaLocationDot /></span>
              <span className="label">Paraderos</span>
            </span>
            <ul className="submenu">
              <li>
                <a href="#"><span className="icon"><FaList /></span> Listar Paraderos</a>
              </li>
              <li>
                <a href="#"><span className="icon"><FaPlus /></span> Crear Paraderos</a>
              </li>
            </ul>
          </li>

          <li className={`menu-parent ${openMenu === 2 ? "open" : ""}`}>
            <span className="menu-toggle" onClick={() => handleToggle(2)}>
              <span className="icon"><FaLocationDot /></span>
              <span className="label">Usuarios</span>
            </span>
            <ul className="submenu">
              <li>
                <a href="#"><span className="icon"><FaList /></span> Listado Usuarios</a>
              </li>
              <li>
                <a href="#"><span className="icon"><FaPlus /></span> Crear Usuario</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Header;
