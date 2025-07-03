import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/dashboardAdmin.css";
import Header from "../../components/header";

export default function DashboardRouWhite() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [rutas, setRutas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login"); 
      return;
    }

    fetch("http://localhost:3000/api/register/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => setRutas(data))
      .catch((err) => console.error("Error al obtener rutas:", err));
  }, [navigate]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        event.target.id !== "profileBtn"
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <Header />

      <div className="profile-menu-container">
        <button
          className="profile-btn"
          id="profileBtn"
          onClick={() => setOpen(!open)}
        >
          <span className="profile-initial">Y</span>
        </button>
        <div
          className={`profile-dropdown ${open ? "open" : ""}`}
          id="profileDropdown"
          ref={dropdownRef}
        >
          <div className="profile-header">
            <span className="profile-initial big">Y</span>
            <div className="profile-user">Yesidortiz2007</div>
          </div>
          <ul>
            <li><a href="#">Novedades</a></li>
            <li><a href="#">Mi Perfil</a></li>
            <li><a href="#">Configuración De Cuenta</a></li>
          </ul>
          <div className="profile-signout">
            <a href="#">Sign out</a>
          </div>
        </div>
      </div>

      <main className="dashboard-main">
        <section className="stats-cards">
          <div className="card purple">
            <div className="card-icon">🔵</div>
            <div className="card-value">{rutas.length}</div><span>Total Rutas</span>
          </div>
          <div className="card blue">
            <div className="card-icon">🟢</div>
            <div className="card-value">{rutas.filter(r => r.activa).length}</div><span>Rutas Activas</span>
          </div>
          <div className="card yellow">
            <div className="card-icon">🟡</div>
            <div className="card-value">{rutas.filter(r => !r.activa).length}</div><span>Rutas Inactivas</span>
          </div>
          <div className="card red">
            <div className="card-icon">🔴</div>
            <div className="card-value">20</div><span>Incidencias</span>
          </div>
        </section>

        <div className="dashboard-grid">
          <div className="dashboard-box">
            <h3>Rutas Activas</h3>
            <img
              src="https://img.freepik.com/vector-premium/mapa-ruta-punteros-estilo-plano_23-2147789377.jpg"
              alt="Mapa de rutas"
              className="dashboard-map"
            />
          </div>

          <div className="dashboard-box">
            <h3>Rutas Activas</h3>
            <table>
              <thead>
                <tr>
                  <th>Ruta</th>
                  <th>Origen</th>
                  <th>Destino</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {rutas
                  .filter(r => r.activa) // Asumiendo que cada ruta tiene un campo 'activa'
                  .map((ruta, index) => (
                    <tr key={index}>
                      <td>{ruta.id}</td>
                      <td>{ruta.origen}</td>
                      <td>{ruta.destino}</td>
                      <td><a href="#">Ver</a></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="dashboard-box">
            <h3>Incidencias</h3>
            <table>
              <thead>
                <tr>
                  <th>Ruta</th>
                  <th>Vehículo</th>
                  <th>Incidencia</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>10</td><td>Bus 207</td><td>Retraso</td></tr>
                <tr><td>2</td><td>Truck 312</td><td>Avería</td></tr>
                <tr><td>9</td><td>Van 125</td><td>Tráfico</td></tr>
                <tr><td>7</td><td>Bus 224</td><td>Accidente</td></tr>
              </tbody>
            </table>
          </div>

          <div className="dashboard-box">
            <h3>Estado de Vehículos</h3>
            <div className="dashboard-pie">
              <svg width="100" height="100" viewBox="0 0 32 32">
                <circle r="16" cx="16" cy="16" fill="#FEF3E2" />
                <circle r="16" cx="16" cy="16" fill="none" stroke="#F3C623" strokeWidth="8" strokeDasharray="43 57" strokeDashoffset="0" />
                <circle r="16" cx="16" cy="16" fill="none" stroke="#FFB22C" strokeWidth="8" strokeDasharray="13 87" strokeDashoffset="-43" />
                <circle r="16" cx="16" cy="16" fill="none" stroke="#FA812F" strokeWidth="8" strokeDasharray="10 90" strokeDashoffset="-56" />
              </svg>
              <ul>
                <li><span style={{ color: "#F3C623" }}>●</span> Operativos 68%</li>
                <li><span style={{ color: "#FFB22C" }}>●</span> Mantenimiento 20%</li>
                <li><span style={{ color: "#FA812F" }}>●</span> Inactivos 16%</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
