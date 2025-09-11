import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "../../../styles/admin/auth/login.css";
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState({ email: '', contrasena: '' });
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  // 🔧 Manejo de campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
  };

  // 🔐 Login clásico
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setMensaje(data.msg || 'Credenciales incorrectas');
        setMostrarModal(true);
      }
    } catch (err) {
      console.error('Error en login clásico:', err);
      setMensaje('Error al conectar con el servidor');
      setMostrarModal(true);
    }
  };

  // 🔐 Login con Google
  const handleGoogleLogin = async (credentialResponse) => {
    const tokenGoogle = credentialResponse.credential;
    console.log('🔐 Token generado por Google:', tokenGoogle); // Copiar para Postman

    try {
      const res = await fetch('http://localhost:3000/api/login/login-google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: tokenGoogle })
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        setMensaje(data.msg || 'Error al iniciar sesión con Google');
        setMostrarModal(true);
      }
    } catch (err) {
      console.error('Error en login con Google:', err);
      setMensaje('Error al conectar con el servidor (Google)');
      setMostrarModal(true);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        {/* Panel izquierdo */}
        <div className="left-panel">
          <h1>Bienvenidos a RouWhite</h1>
          <p>Accede con tu cuenta para gestionar tus rutas y más.</p>
          <div className="button-container">
            <Link to="/Registro" className="small-button">Registrarse</Link>
          </div>
        </div>

        {/* Panel derecho */}
        <div className="right-panel">
          <h2>USER LOGIN</h2>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <i className="fa-solid fa-envelope"></i>
              <input
                type="email"
                name="email"
                placeholder="Correo electrónico"
                value={datos.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <i className="fa-solid fa-lock"></i>
              {datos.contrasena && (
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
                value={datos.contrasena}
                onChange={handleChange}
                required
                style={{ paddingLeft: '70px' }}
              />
            </div>

            <p className="olvide">
              <Link to="/recuperar-clave">¿Olvidaste tu contraseña?</Link>
            </p>

            <button type="submit">LOGIN</button>
          </form>

          {/* Botón de Google */}
          <div style={{ marginTop: '20px' }}>
            <GoogleLogin
              onSuccess={handleGoogleLogin}
              onError={() => {
                setMensaje('Error al iniciar sesión con Google');
                setMostrarModal(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* Modal de error */}
      {mostrarModal && (
        <div className="modal-error">
          <div className="modal-contenido">
            <span className="icono-error">❌</span>
            <h3>Error</h3>
            <p>{mensaje}</p>
            <button onClick={() => setMostrarModal(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
