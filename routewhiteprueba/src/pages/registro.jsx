import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/registro.css';

const Registro = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [errores, setErrores] = useState({});

  const [usuario, setUsuario] = useState({
    nombre: '',
    telefono: '',
    email: '',
    contrasena: '',
    confirmarContrasena: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario(prev => ({ ...prev, [name]: value }));
    setErrores(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuario.contrasena !== usuario.confirmarContrasena) {
      setErrores({ confirmarContrasena: 'Las contraseñas no coinciden' });
      return;
    }

    const datosUsuario = {
      nombre: usuario.nombre,
      telefono: usuario.telefono,
      email: usuario.email,
      contraseña: usuario.contrasena
    };

    try {
      const response = await axios.post('http://localhost:3000/api/usuarios/register', datosUsuario);
      setMensaje(response.data.mensaje || 'Registro exitoso');
      setUsuario({
        nombre: '',
        telefono: '',
        email: '',
        contrasena: '',
        confirmarContrasena: ''
      });
      navigate('/login');
    } catch (error) {
      const msg = error.response?.data?.mensaje;
      const nuevosErrores = {};

      if (msg?.includes('Correo')) {
        nuevosErrores.email = msg;
      } else if (msg?.includes('Contraseña')) {
        nuevosErrores.contrasena = msg;
      } else {
        nuevosErrores.general = msg || 'Error al registrar';
      }

      setErrores(nuevosErrores);
    }
  };

  return (
    <div className="registro">
      <div className="wrapper">
        <div className="container">
          <div className="right-panel">
            <h2>Registro de Usuario</h2>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <i className="fa-solid fa-user"></i>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo"
                  required
                  value={usuario.nombre}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <i className="fa-solid fa-phone"></i>
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  required
                  value={usuario.telefono}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  required
                  value={usuario.email}
                  onChange={handleChange}
                />
                {errores.email && <small className="error">{errores.email}</small>}
              </div>

              <div className="input-group">
                <i className="fa-solid fa-lock"></i>
                {usuario.contrasena && (
                  <i
                    className={`fa-solid ${mostrarContrasena ? 'fa-eye-slash' : 'fa-eye'} eye-toggle`}
                    style={{ left: '40px', right: 'auto' }}
                    onClick={() => setMostrarContrasena(prev => !prev)}
                  ></i>
                )}
                <input
                  type={mostrarContrasena ? 'text' : 'password'}
                  name="contrasena"
                  placeholder="Contraseña"
                  required
                  value={usuario.contrasena}
                  onChange={handleChange}
                  style={{ paddingLeft: '70px' }}
                />
                {errores.contrasena && <small className="error">{errores.contrasena}</small>}
              </div>

              <div className="input-group">
                <i className="fa-solid fa-lock"></i>
                {usuario.confirmarContrasena && (
                  <i
                    className={`fa-solid ${mostrarConfirmacion ? 'fa-eye-slash' : 'fa-eye'} eye-toggle`}
                    style={{ left: '40px', right: 'auto' }}
                    onClick={() => setMostrarConfirmacion(prev => !prev)}
                  ></i>
                )}
                <input
                  type={mostrarConfirmacion ? 'text' : 'password'}
                  name="confirmarContrasena"
                  placeholder="Confirmar contraseña"
                  required
                  value={usuario.confirmarContrasena}
                  onChange={handleChange}
                  style={{ paddingLeft: '70px' }}
                />
                {errores.confirmarContrasena && (
                  <small className="error">{errores.confirmarContrasena}</small>
                )}
              </div>

              <button type="submit" className="register-button">Registrarse</button>
              {errores.general && <p className="error">{errores.general}</p>}
              {mensaje && <p className="mensaje-exito">{mensaje}</p>}
            </form>
          </div>

          <div className="left-panel">
            <h1>¡Únete a nosotros!</h1>
            <p>Regístrate para disfrutar de todos nuestros beneficios.</p>
            <div className="button-container">
              <Link to="/login" className="small-button">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
