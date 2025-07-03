import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../assets/login.css";

const RegistroAdministrador = ({ rol }) => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    telefono: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: ''
  });

  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: '' })); // Limpia el error al escribir
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple en frontend
    if (formulario.contrasena !== formulario.confirmarContrasena) {
      setErrores({ confirmarContrasena: 'Las contraseñas no coinciden' });
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/register/admin`, formulario);

      alert(response.data.mensaje || 'Registro exitoso');

      // Limpia formulario y errores si todo va bien
      setFormulario({
        nombre: '',
        telefono: '',
        correo: '',
        contrasena: '',
        confirmarContrasena: ''
      });
      setErrores({});
    } catch (error) {
      const mensaje = error.response?.data?.mensaje;
      const nuevosErrores = {};

      if (mensaje?.includes('Correo')) {
        nuevosErrores.correo = mensaje;
      } else if (mensaje?.includes('Contraseña')) {
        nuevosErrores.contrasena = mensaje;
      } else if (mensaje?.includes('telefono') || mensaje?.includes('Teléfono')) {
        nuevosErrores.telefono = mensaje;
      } else {
        nuevosErrores.general = mensaje || error.message || 'Error al registrar';
      }

      setErrores(nuevosErrores);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="right-panel">
          <h2>Registro de Administrador</h2>

          {errores.general && <p style={{ color: 'red', marginBottom: '10px' }}>{errores.general}</p>}

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                required
                value={formulario.nombre}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono"
                required
                value={formulario.telefono}
                onChange={handleChange}
              />
              {errores.telefono && <small className="error">{errores.telefono}</small>}
            </div>

            <div className="input-group">
              <input
                type="email"
                name="correo"
                placeholder="Correo electrónico"
                required
                value={formulario.correo}
                onChange={handleChange}
              />
              {errores.correo && <small className="error">{errores.correo}</small>}
            </div>

            <div className="input-group">
              <input
                type="password"
                name="contrasena"
                placeholder="Contraseña"
                required
                value={formulario.contrasena}
                onChange={handleChange}
              />
              {errores.contrasena && <small className="error">{errores.contrasena}</small>}
            </div>

            <div className="input-group">
              <input
                type="password"
                name="confirmarContrasena"
                placeholder="Confirmar contraseña"
                required
                value={formulario.confirmarContrasena}
                onChange={handleChange}
              />
              {errores.confirmarContrasena && <small className="error">{errores.confirmarContrasena}</small>}
            </div>

            <button type="submit">Registrarse</button>
          </form>
        </div>

        <div className="left-panel">
          <h1>Administrador</h1>
          <p>Registra un nuevo administrador para gestionar el sistema de rutas.</p>
          <div className="button-container">
            <Link to="/login-administrador" className="small-button">Login Admin</Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroAdministrador;
