import React, { useState } from "react";
import "../../../styles/admin/usuarios/CrearUsuarios.css";

const CrearUsuario = () => {
    // Simula un usuario admin logueado para desarrollo
    const user = { rol: "Admin" };
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const [mensaje, setMensaje] = useState("");
    const [loading, setLoading] = useState(false);

    // Validar campos
    const validarFormulario = () => {
        if (!nombre || !correo || !password) {
            setMensaje("⚠️ Todos los campos son obligatorios");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(correo)) {
            setMensaje("⚠️ Correo no válido");
            return false;
        }
        if (password.length < 6) {
            setMensaje("⚠️ La contraseña debe tener al menos 6 caracteres");
            return false;
        }
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        setLoading(true);
        setMensaje("");

        // Simulación de creación de usuario con datos quemados
        setTimeout(() => {
            setMensaje("✅ Usuario creado exitosamente (simulado)");
            setNombre("");
            setCorreo("");
            setPassword("");
            setLoading(false);
        }, 1000);
    };

    // Restricción: solo admin puede ver este formulario
    if (!user || user.rol !== "Admin") {
        return <p>🚫 No tienes permisos para crear usuarios</p>;
    }

   return (
  <div className="crear-usuario-container">
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
          <input
              type="text"
              placeholder="Nombre completo"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
          />
          <input
              type="email"
              placeholder="Correo electrónico"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
          />
          <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
          />
          <button type="submit" disabled={loading}>
              {loading ? "Creando..." : "Crear"}
          </button>
      </form>
      {mensaje && <p>{mensaje}</p>}
  </div>
);

};

export default CrearUsuario;
