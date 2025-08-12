import React, { useState } from "react";

export default function ConfiguracionCuentaModal({ modalConfiguracion, setModalConfiguracion, perfil, setPerfil }) {
  const [tab, setTab] = useState("editarPerfil");

  // Estados para cambio de contraseña
  const [contrasenaActual, setContrasenaActual] = useState("");
  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [errorContrasena, setErrorContrasena] = useState("");

  // Estados para seguridad y preferencias
  const [autenticacion2FA, setAutenticacion2FA] = useState(false);
  const [modoOscuro, setModoOscuro] = useState(false);
  const [notificacionesEmail, setNotificacionesEmail] = useState(true);

  // Función para cambiar contraseña (simple ejemplo)
  const handleCambiarContrasena = () => {
    setErrorContrasena("");
    if (contrasenaActual !== perfil.contrasena) {
      setErrorContrasena("Contraseña actual incorrecta");
      return;
    }
    if (nuevaContrasena.length < 6) {
      setErrorContrasena("La nueva contraseña debe tener mínimo 6 caracteres");
      return;
    }
    if (nuevaContrasena !== confirmarContrasena) {
      setErrorContrasena("Las contraseñas no coinciden");
      return;
    }
    setPerfil({ ...perfil, contrasena: nuevaContrasena });
    alert("Contraseña cambiada correctamente");
    setContrasenaActual("");
    setNuevaContrasena("");
    setConfirmarContrasena("");
  };

  // Función eliminar cuenta (ejemplo)
  const handleEliminarCuenta = () => {
    if (window.confirm("¿Seguro que quieres eliminar tu cuenta? Esta acción es irreversible.")) {
      alert("Cuenta eliminada");
      setModalConfiguracion(false);
      // Aquí iría la lógica real de eliminación y logout
    }
  };

  if (!modalConfiguracion) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        display: "flex", justifyContent: "center", alignItems: "center",
        zIndex: 2000
      }}
      onClick={() => setModalConfiguracion(false)}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "15px",
          padding: 25,
          width: 500,
          maxHeight: "90vh",
          overflowY: "auto",
          boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Pestañas */}
        <div style={{ display: "flex", marginBottom: 20, borderBottom: "1px solid #eee" }}>
          {[
            { id: "editarPerfil", label: "Editar Perfil" },
            { id: "cambiarContrasena", label: "Cambiar Contraseña" },
            { id: "seguridad", label: "Seguridad" },
            { id: "preferencias", label: "Preferencias" },
            { id: "integraciones", label: "Integraciones" },
            { id: "eliminarCuenta", label: "Eliminar Cuenta" },
          ].map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                flex: 1,
                padding: 10,
                background: tab === id ? "#ffb300" : "transparent",
                color: tab === id ? "#fff" : "#333",
                border: "none",
                borderRadius: "8px 8px 0 0",
                cursor: "pointer",
                fontWeight: "bold",
                transition: "background-color 0.3s"
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Contenido pestañas */}
        {tab === "editarPerfil" && (
          <div>
            {/* Inputs para nombre, apellido, apodo, correo, teléfono, dirección, fecha de nacimiento */}
            {[
              { label: "Nombre", key: "nombre", type: "text" },
              { label: "Apellido", key: "apellido", type: "text" },
              { label: "Apodo", key: "apodo", type: "text" },
              { label: "Correo", key: "correo", type: "email" },
              { label: "Teléfono", key: "telefono", type: "tel" },
              { label: "Dirección", key: "direccion", type: "text" },
              { label: "Fecha de Nacimiento", key: "fechaNacimiento", type: "date" },
            ].map(({ label, key, type }) => (
              <div key={key} style={{ marginBottom: 15 }}>
                <label style={{ fontWeight: "bold", fontSize: 14, color: "#555" }}>{label}</label>
                <input
                  type={type}
                  value={perfil[key] || ""}
                  onChange={(e) => setPerfil({ ...perfil, [key]: e.target.value })}
                  style={{
                    width: "100%",
                    padding: 10,
                    marginTop: 5,
                    borderRadius: 8,
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

            {/* Foto de perfil */}
            <div style={{ marginBottom: 15 }}>
              <label style={{ fontWeight: "bold", display: "block", marginBottom: 6 }}>Foto de Perfil</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setPerfil({ ...perfil, foto: reader.result });
                    reader.readAsDataURL(file);
                  }
                }}
              />
              {perfil.foto && (
                <img
                  src={perfil.foto}
                  alt="Foto de Perfil"
                  style={{ width: 100, height: 100, borderRadius: "50%", marginTop: 10, objectFit: "cover", border: "2px solid #ffb300" }}
                />
              )}
            </div>

            <button
              onClick={() => alert("Cambios de perfil guardados")}
              style={{
                background: "linear-gradient(45deg, #ffb300, #ff9500)",
                color: "#fff",
                padding: 10,
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Guardar Cambios
            </button>
          </div>
        )}

        {tab === "cambiarContrasena" && (
          <div>
            <div style={{ marginBottom: 15 }}>
              <label style={{ fontWeight: "bold" }}>Contraseña Actual</label>
              <input
                type="password"
                value={contrasenaActual}
                onChange={(e) => setContrasenaActual(e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={{ marginBottom: 15 }}>
              <label style={{ fontWeight: "bold" }}>Nueva Contraseña</label>
              <input
                type="password"
                value={nuevaContrasena}
                onChange={(e) => setNuevaContrasena(e.target.value)}
                style={inputStyle}
              />
              <small>Debe tener al menos 6 caracteres, mayúsculas, números y símbolos</small>
            </div>
            <div style={{ marginBottom: 15 }}>
              <label style={{ fontWeight: "bold" }}>Confirmar Nueva Contraseña</label>
              <input
                type="password"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                style={inputStyle}
              />
            </div>
            {errorContrasena && <p style={{ color: "red" }}>{errorContrasena}</p>}
            <button
              onClick={handleCambiarContrasena}
              style={buttonStyle}
            >
              Cambiar Contraseña
            </button>
          </div>
        )}

        {tab === "seguridad" && (
          <div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 15 }}>
              <input
                type="checkbox"
                checked={autenticacion2FA}
                onChange={() => setAutenticacion2FA(!autenticacion2FA)}
              />
              Activar Autenticación en Dos Pasos (2FA)
            </label>

            <div style={{ marginBottom: 15 }}>
              <h4>Sesiones Activas</h4>
              {/* Aquí podrías listar dispositivos y dar opción a cerrar sesión */}
              <p>No hay sesiones activas para mostrar</p>
            </div>

            <button
              onClick={() => alert("Cerrar sesión en otros dispositivos")}
              style={buttonStyle}
            >
              Cerrar Sesión en Otros Dispositivos
            </button>
          </div>
        )}

        {tab === "preferencias" && (
          <div>
            <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 15 }}>
              <input
                type="checkbox"
                checked={modoOscuro}
                onChange={() => setModoOscuro(!modoOscuro)}
              />
              Modo Oscuro
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 15 }}>
              <input
                type="checkbox"
                checked={notificacionesEmail}
                onChange={() => setNotificacionesEmail(!notificacionesEmail)}
              />
              Notificaciones por Email
            </label>
            {/* Aquí puedes añadir más preferencias: idioma, privacidad, etc. */}
          </div>
        )}

        {tab === "integraciones" && (
          <div>
            <h4>Integraciones y Conexiones</h4>
            <p>Vincula o desvincula cuentas externas aquí.</p>
            {/* Botones o inputs para conectar con Google, Facebook, etc. */}
            <button style={buttonStyle} onClick={() => alert("Conectar con Google")}>Conectar Google</button>
            <button style={buttonStyle} onClick={() => alert("Desconectar Facebook")}>Desconectar Facebook</button>
          </div>
        )}

        {tab === "eliminarCuenta" && (
          <div>
            <h4 style={{ color: "red" }}>Eliminar Cuenta</h4>
            <p>Esta acción es irreversible. Se eliminarán todos tus datos.</p>
            <button
              onClick={handleEliminarCuenta}
              style={{ ...buttonStyle, backgroundColor: "red", marginTop: 10 }}
            >
              Eliminar Cuenta
            </button>
          </div>
        )}

      </div>
    </div>
  );
}

// Estilos auxiliares para inputs y botones
const inputStyle = {
  width: "100%",
  padding: 10,
  marginTop: 5,
  borderRadius: 8,
  border: "1px solid #ccc",
  outline: "none",
  transition: "border-color 0.3s, box-shadow 0.3s",
};

const buttonStyle = {
  background: "linear-gradient(45deg, #ffb300, #ff9500)",
  color: "#fff",
  padding: 10,
  border: "none",
  borderRadius: 8,
  cursor: "pointer",
  fontWeight: "bold",
  marginTop: 10,
};