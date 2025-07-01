import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../assets/registro.css"; // Asegúrate de que la ruta sea correcta


const RegistroAdministrador = ({ rol }) => {
  const [formulario, setFormulario] = useState({
    nombre: '',
    identificacion: '',
    telefono: '',
    correo: '',
    contrasena: '',
    confirmarContrasena: ''
  });

  const [errores, setErrores] = useState({});
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false); // ✅ NUEVO estado

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formulario.contrasena !== formulario.confirmarContrasena) {
      setErrores({ confirmarContrasena: 'Las contraseñas no coinciden' });
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/register/${rol}`, formulario);
      alert(response.data.mensaje || 'Registro exitoso');

      setFormulario({
        nombre: '',
        identificacion: '',
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
      } else if (mensaje?.includes('Identificación') || mensaje?.includes('identificacion')) {
        nuevosErrores.identificacion = mensaje;
      } else {
        nuevosErrores.general = mensaje || error.message || 'Error al registrar';
        setMostrarModal(true); // ✅ MOSTRAR MODAL
      }

      setErrores(nuevosErrores);
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h1>Administrador</h1>
        <p>Registra un nuevo administrador para gestionar el sistema de rutas.</p>
        <div className="button-container">
          <Link to="/login-administrador" className="small-button">
            Login Admin
          </Link>
        </div>
      </div>

      <div className="right-panel">
        <h2>Registro de Administrador</h2>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i className="fa-solid fa-user"></i>
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
            <i className="fa-solid fa-id-card"></i>
            <input
              type="text"
              name="identificacion"
              placeholder="Identificación"
              required
              value={formulario.identificacion}
              onChange={handleChange}
            />
            {errores.identificacion && <small className="error">{errores.identificacion}</small>}
          </div>

          <div className="input-group">
            <i className="fa-solid fa-phone"></i>
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
            <i className="fa-solid fa-envelope"></i>
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
            <i className="fa-solid fa-lock"></i>
            {formulario.contrasena && (
              <i
                className={`fa-solid ${mostrarContrasena ? 'fa-eye-slash' : 'fa-eye'} eye-toggle`}
                style={{ left: '40px', right: 'auto' }}
                onClick={() => setMostrarContrasena(prev => !prev)}
              ></i>
            )}
            <input
              type={mostrarContrasena ? "text" : "password"}
              name="contrasena"
              placeholder="Contraseña"
              required
              value={formulario.contrasena}
              onChange={handleChange}
              style={{ paddingLeft: '70px' }}
            />
            {errores.contrasena && <small className="error">{errores.contrasena}</small>}
          </div>

          <div className="input-group">
            <i className="fa-solid fa-lock"></i>
            {formulario.confirmarContrasena && (
              <i
                className={`fa-solid ${mostrarConfirmacion ? 'fa-eye-slash' : 'fa-eye'} eye-toggle`}
                style={{ left: '40px', right: 'auto' }}
                onClick={() => setMostrarConfirmacion(prev => !prev)}
              ></i>
            )}
            <input
              type={mostrarConfirmacion ? "text" : "password"}
              name="confirmarContrasena"
              placeholder="Confirmar contraseña"
              required
              value={formulario.confirmarContrasena}
              onChange={handleChange}
              style={{ paddingLeft: '70px' }}
            />
            {errores.confirmarContrasena && (
              <small className="error">{errores.confirmarContrasena}</small>
            )}
          </div>

          <button type="submit" className="register-button">Registrarse</button>
        </form>
        
      </div>

      {/* ✅ MODAL DE ERROR GENERAL */}
      {mostrarModal && errores.general && (
        <div className="modal-error">
          <div className="modal-contenido">
            <span className="icono-error">❌</span>
            <h3>Error</h3>
            <p>{errores.general}</p>
            <button onClick={() => setMostrarModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistroAdministrador;
