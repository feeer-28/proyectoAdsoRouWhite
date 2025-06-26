import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../assets/login.css'; // ✅ Usamos estilos del login

const Registro = () => {
  const navigate = useNavigate();
  const [mensaje, setMensaje] = useState('');

  const [usuario, setUsuario] = useState({
    nombre: '',
    telefono: '',
    email: '',
    contrasena: '',
    confirmarContrasena: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (usuario.contrasena !== usuario.confirmarContrasena) {
      setMensaje('Las contraseñas no coinciden');
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
      setMensaje(error.response?.data?.mensaje || 'Error al registrar');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        {/* ✅ Registro primero (izquierda) */}
        <div className="right-panel">
          <h2>Registro de Usuario</h2>
          {mensaje && <p style={{ color: 'red', marginBottom: '10px' }}>{mensaje}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
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
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                required
                value={usuario.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="contrasena"
                placeholder="Contraseña"
                required
                value={usuario.contrasena}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="confirmarContrasena"
                placeholder="Confirmar contraseña"
                required
                value={usuario.confirmarContrasena}
                onChange={handleChange}
              />
            </div>

            <button type="submit">Registrarse</button>
          </form>
        </div>

        {/* ✅ Panel de bienvenida ahora a la derecha */}
        <div className="left-panel">
          <h1>¡Únete a nosotros!</h1>
          <p>Regístrate para disfrutar de todos nuestros beneficios.</p>
          <div className="button-container">
            <Link to="/login" className="small-button">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
