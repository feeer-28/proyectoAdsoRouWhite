import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/admin/dashboard/dashboardAdmin.css";
import SidebarAdmin from "../../Administrador/sidebar/sidebarAdmin.jsx";

import ConfiguracionCuentaModal from "./confCuenta";


export default function DashboarAdmin() {
  const [open, setOpen] = useState(false);
  const [modalNovedades, setModalNovedades] = useState(false);
  const [modalPerfil, setModalPerfil] = useState(false);
  const [modalConfiguracion, setModalConfiguracion] = useState(false);
  const dropdownRef = useRef(null);
  const [rutas, setRutas] = useState([]);
  const navigate = useNavigate();

  // Estado de novedades
  const [novedades, setNovedades] = useState(() => {
    try {
      const guardadas = localStorage.getItem("novedadesAdmin");
      return guardadas
        ? JSON.parse(guardadas)
        : [
          { id: 1, fecha: "08/08/2025", titulo: "Nueva función de reservas", descripcion: "Ahora puedes gestionar reservas desde el panel principal." },
          { id: 2, fecha: "05/08/2025", titulo: "Mejora de seguridad", descripcion: "Se actualizó el sistema de autenticación para mayor seguridad." },
          { id: 3, fecha: "01/08/2025", titulo: "Optimización de rendimiento", descripcion: "La carga de datos es ahora un 40% más rápida." }
        ];
    } catch (e) {
      console.error("Error leyendo novedades de localStorage:", e);
      return [
        { id: 1, fecha: "08/08/2025", titulo: "Nueva función de reservas", descripcion: "Ahora puedes gestionar reservas desde el panel principal." },
        { id: 2, fecha: "05/08/2025", titulo: "Mejora de seguridad", descripcion: "Se actualizó el sistema de autenticación para mayor seguridad." },
        { id: 3, fecha: "01/08/2025", titulo: "Optimización de rendimiento", descripcion: "La carga de datos es ahora un 40% más rápida." }
      ];
    }
  });

  // Estado para edición de novedades
  const [editandoNovedad, setEditandoNovedad] = useState(null);
  const [novedadEditada, setNovedadEditada] = useState({ titulo: "", descripcion: "" });

  // Estado para nueva novedad
  const [nuevaNovedad, setNuevaNovedad] = useState({ titulo: "", descripcion: "" });

  // Guardar novedades en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem("novedadesAdmin", JSON.stringify(novedades));
    } catch (e) {
      console.error("Error guardando novedades en localStorage:", e);
    }
  }, [novedades]);

  const cerrarSesion = () => {
    const confirmar = window.confirm("¿Estás seguro que quieres cerrar sesión?");
    if (confirmar) {
      localStorage.removeItem('tokenAdmin');
      navigate('/login');
    }
  };

  const handleGuardarPerfil = () => {
    console.log("Datos guardados:", perfil);
    alert("Perfil actualizado correctamente");
    setModalPerfil(false);
  };

  // Función para agregar novedad
  const agregarNovedad = () => {
    if (!nuevaNovedad.titulo.trim() || !nuevaNovedad.descripcion.trim()) {
      alert("Por favor completa todos los campos");
      return;
    }

    const fechaHoy = new Date().toLocaleDateString("es-CO");
    const nueva = {
      id: novedades.length > 0 ? Math.max(...novedades.map(n => n.id)) + 1 : 1,
      fecha: fechaHoy,
      titulo: nuevaNovedad.titulo,
      descripcion: nuevaNovedad.descripcion
    };

    setNovedades([nueva, ...novedades]);
    setNuevaNovedad({ titulo: "", descripcion: "" });
  };

  // Función para eliminar novedad
  const eliminarNovedad = (id) => {
    if (window.confirm("¿Estás seguro de eliminar esta novedad?")) {
      setNovedades(novedades.filter(n => n.id !== id));
      if (editandoNovedad === id) {
        setEditandoNovedad(null);
      }
    }
  };

  // Función para iniciar edición
  const iniciarEdicion = (novedad) => {
    setEditandoNovedad(novedad.id);
    setNovedadEditada({
      titulo: novedad.titulo,
      descripcion: novedad.descripcion
    });
  };

  // Función para guardar cambios de edición
  const guardarEdicion = () => {
    if (!novedadEditada.titulo.trim() || !novedadEditada.descripcion.trim()) {
      alert("Por favor complete todos los campos");
      return;
    }

    setNovedades(novedades.map(n =>
      n.id === editandoNovedad
        ? { ...n, titulo: novedadEditada.titulo, descripcion: novedadEditada.descripcion }
        : n
    ));
    setEditandoNovedad(null);
  };

  // Función para cancelar edición
  const cancelarEdicion = () => {
    setEditandoNovedad(null);
  };

  // Datos de perfil
  const [perfil, setPerfil] = useState({
    nombre: "Yesid Ortiz",
    usuario: "Yesidortiz2007",
    correo: "yesid@example.com",
    contrasena: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("tokenAdmin");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("/api/register/admin/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Ruta no encontrada");
        return res.json();
      })
      .then((data) => setRutas(data))
      .catch((err) => {
        console.error("Error al obtener rutas:", err);
        setRutas([]);
      });
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
    <div style={{ paddingLeft: "300px", minHeight: "100vh" }}>
      <SidebarAdmin />

      <div style={{ position: "relative" }}>
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
              <div className="profile-user">{perfil.usuario}</div>
            </div>
            <ul>
              <li><a href="#" onClick={() => setModalNovedades(true)}>Novedades</a></li>
              <li><a href="#" onClick={() => setModalPerfil(true)}>Mi Perfil</a></li>
              <li>
                <a href="#" onClick={() => setModalConfiguracion(true)}>
                  Configuración De Cuenta
                </a>
              </li>
            </ul>
            <div className="profile-signout">
              <button className="btn-logout" onClick={cerrarSesion}>
                Cerrar sesión
              </button>
            </div>
          </div>
        </div>

        <main className="dashboard-main">
          <section className="stats-cards">
            <div className="card purple">
              <div className="card-icon">🔵</div>
              <div className="card-value">{rutas.length}</div>
              <span>Total Rutas</span>
            </div>
            <div className="card blue">
              <div className="card-icon">🟢</div>
              <div className="card-value">{rutas.filter(r => r.activa).length}</div>
              <span>Rutas Activas</span>
            </div>
            <div className="card yellow">
              <div className="card-icon">🟡</div>
              <div className="card-value">{rutas.filter(r => !r.activa).length}</div>
              <span>Rutas Inactivas</span>
            </div>
            <div className="card red">
              <div className="card-icon">🔴</div>
              <div className="card-value">20</div>
              <span>Incidencias</span>
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
                  {rutas.filter(r => r.activa).length === 0 ? (
                    <tr><td colSpan="4">No hay rutas activas.</td></tr>
                  ) : (
                    rutas.filter(r => r.activa).map((ruta, index) => (
                      <tr key={index}>
                        <td>{ruta.id}</td>
                        <td>{ruta.origen}</td>
                        <td>{ruta.destino}</td>
                        <td><a href="#">Ver</a></td>
                      </tr>
                    ))
                  )}
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

      {/* Modal de Novedades */}
      {modalNovedades && (
        <div
          style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
            background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000
          }}
          onClick={() => setModalNovedades(false)}
        >
          <div
            style={{
              background: "#fff", borderRadius: "12px", padding: "22px", width: "480px",
              maxHeight: "82vh", overflowY: "auto", boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
              animation: "fadeIn 0.25s ease-in-out"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <h2 style={{ margin: 0, color: "#222", fontSize: "18px" }}>📢 Novedades del Proyecto</h2>
              <span style={{ fontSize: "13px", color: "#666" }}>{novedades.length} registradas</span>
            </div>

            <p style={{ marginTop: 0, marginBottom: 12, fontSize: 13, color: "#555" }}>
              Añade novedades rápidas desde aquí. Se guardan localmente en tu navegador.
            </p>

            {/* Formulario para añadir novedad */}
            <div style={{
              background: "#f5f9ff", padding: "12px", borderRadius: "8px",
              marginBottom: "14px", border: "1px solid #e1efff"
            }}>
              <label style={{ fontSize: 13, color: "#444" }}>Título</label>
              <input
                type="text"
                placeholder="Título de la novedad"
                value={nuevaNovedad.titulo}
                onChange={(e) => setNuevaNovedad({ ...nuevaNovedad, titulo: e.target.value })}
                style={{
                  width: "100%", padding: "9px 10px", marginTop: "6px",
                  marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccdffb",
                  outline: "none", fontSize: 14
                }}
              />
              <label style={{ fontSize: 13, color: "#444" }}>Descripción</label>
              <textarea
                placeholder="Descripción breve..."
                value={nuevaNovedad.descripcion}
                onChange={(e) => setNuevaNovedad({ ...nuevaNovedad, descripcion: e.target.value })}
                style={{
                  width: "100%", padding: "9px 10px", marginTop: "6px",
                  marginBottom: "10px", borderRadius: "6px", border: "1px solid #ccdffb",
                  outline: "none", fontSize: 14, resize: "vertical", minHeight: 70
                }}
              />

              <div style={{ display: "flex", gap: 10 }}>
                <button
                  onClick={agregarNovedad}
                  style={{
                    padding: "9px 14px",
                    background: "linear-gradient(90deg,#4caf50,#2e9e3d)",
                    color: "#fff", border: "none", borderRadius: "8px",
                    cursor: "pointer", fontWeight: "600", flex: "1"
                  }}
                >
                  ➕ Añadir novedad
                </button>
                <button
                  onClick={() => {
                    setNuevaNovedad({ titulo: "", descripcion: "" });
                  }}
                  style={{
                    padding: "9px 14px",
                    background: "#f3f3f3",
                    color: "#333", border: "none", borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  Limpiar
                </button>
              </div>
            </div>

            {/* Lista de novedades */}
            {novedades.length === 0 ? (
              <p style={{ textAlign: "center", color: "#777", marginBottom: 10 }}>No hay novedades registradas.</p>
            ) : (
              novedades.map((n) => (
                <div key={n.id} style={{
                  background: "#ffffff",
                  padding: "12px",
                  borderRadius: "8px",
                  marginBottom: "10px",
                  borderLeft: "5px solid #ffb300",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.04)"
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    {editandoNovedad === n.id ? (
                      <input
                        value={novedadEditada.titulo}
                        onChange={(e) => setNovedadEditada({ ...novedadEditada, titulo: e.target.value })}
                        style={{
                          flex: 1,
                          padding: "6px",
                          border: "1px solid #ddd",
                          borderRadius: "4px"
                        }}
                      />
                    ) : (
                      <strong style={{ fontSize: 14, color: "#222" }}>{n.titulo}</strong>
                    )}
                    <span style={{ fontSize: 12, color: "#888" }}>{n.fecha}</span>
                  </div>

                  {editandoNovedad === n.id ? (
                    <textarea
                      value={novedadEditada.descripcion}
                      onChange={(e) => setNovedadEditada({ ...novedadEditada, descripcion: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "6px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        marginBottom: "8px",
                        minHeight: "60px"
                      }}
                    />
                  ) : (
                    <p style={{ margin: 0, fontSize: 13, color: "#444" }}>{n.descripcion}</p>
                  )}

                  <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                    {editandoNovedad === n.id ? (
                      <>
                        <button
                          onClick={guardarEdicion}
                          style={{
                            padding: "4px 8px",
                            background: "#4CAF50",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          Guardar
                        </button>
                        <button
                          onClick={cancelarEdicion}
                          style={{
                            padding: "4px 8px",
                            background: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          Cancelar
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => iniciarEdicion(n)}
                          style={{
                            padding: "4px 8px",
                            background: "#2196F3",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => eliminarNovedad(n.id)}
                          style={{
                            padding: "4px 8px",
                            background: "#f44336",
                            color: "white",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}

            <button
              onClick={() => setModalNovedades(false)}
              style={{
                marginTop: "6px", padding: "10px 14px", background: "#ff9800",
                color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", width: "100%"
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {/* Modal de Perfil */}
      {modalPerfil && (
        <div
          style={{
            position: "fixed",
            top: 0, left: 0,
            width: "100%", height: "100%",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            display: "flex", justifyContent: "center", alignItems: "center",
            zIndex: 1000
          }}
          onClick={() => setModalPerfil(false)}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "15px",
              padding: "25px",
              width: "420px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
              animation: "fadeIn 0.3s ease-in-out",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Avatar */}
            <div style={{ textAlign: "center", marginBottom: "15px" }}>
              <label htmlFor="avatarInput" style={{ cursor: "pointer" }}>
                <img
                  src={perfil.foto || "../../assets/imgperfil.png"}
                  alt="Avatar"
                  style={{
                    width: "100px", height: "100px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid #ffb300",
                    transition: "transform 0.3s"
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                />
              </label>
              <input
                type="file"
                id="avatarInput"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setPerfil({ ...perfil, foto: reader.result });
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>

            <h2 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
              👤 Mi Perfil
            </h2>

            {/* Inputs estilizados */}
            {[
              { label: "Nombre", type: "text", key: "nombre" },
              { label: "Usuario", type: "text", key: "usuario" },
              { label: "Correo", type: "email", key: "correo" },
              { label: "Contraseña", type: "password", key: "contrasena" }
            ].map(({ label, type, key }) => (
              <div key={key} style={{ marginBottom: "15px" }}>
                <label style={{ fontWeight: "bold", fontSize: "14px", color: "#555" }}>{label}</label>
                <input
                  type={type}
                  value={perfil[key]}
                  onChange={(e) => setPerfil({ ...perfil, [key]: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    outline: "none",
                    transition: "border-color 0.3s, box-shadow 0.3s"
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#ffb300";
                    e.target.style.boxShadow = "0 0 5px rgba(255,179,0,0.5)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ccc";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </div>
            ))}

            {/* Botones */}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
              <button
                onClick={handleGuardarPerfil}
                style={{
                  flex: 1,
                  padding: "10px 15px",
                  background: "linear-gradient(45deg, #ffb300, #ff9500)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginRight: "10px",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                Guardar cambios
              </button>
              <button
                onClick={() => setModalPerfil(false)}
                style={{
                  flex: 1,
                  padding: "10px 15px",
                  background: "#ccc",
                  color: "#000",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "transform 0.2s"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
      <ConfiguracionCuentaModal
        modalConfiguracion={modalConfiguracion}
        setModalConfiguracion={setModalConfiguracion}
        perfil={perfil}
        setPerfil={setPerfil}
      />
      <button onClick={() => setModalConfiguracion(true)}>Configuración de Cuenta</button>


    </div>
  );
}