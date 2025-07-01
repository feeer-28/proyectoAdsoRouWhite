import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../assets/login.css';
import { GoogleLogin } from '@react-oauth/google';

const LoginAdministrador = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState({ email: '', contrasena: '' });
  const [mensaje, setMensaje] = useState('');
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/administradores/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('tokenAdmin', data.token);
        navigate('/admin/dashboard');
      } else {
        setMensaje(data.msg || 'Credenciales incorrectas');
        setMostrarModal(true);
      }
    } catch {
      setMensaje('Error al conectar con el servidor');
      setMostrarModal(true);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="right-panel">
          <h2>Login Administrador</h2>

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

            <button type="submit">Iniciar sesión</button>

            <p className="olvide">
              <Link to="/recuperar-clave">¿Olvidaste tu contraseña?</Link>
            </p>
          </form>
           <div style={{ marginTop: '20px' }}>
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const res = await fetch('http://localhost:3000/api/administradores/login-google', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: credentialResponse.credential }),
                  });
                  const data = await res.json();
                  if (data.token) {
                    localStorage.setItem('tokenAdmin', data.token);
                    navigate('/admin/dashboard');
                  } else {
                    setMensaje(data.msg || 'Error al iniciar sesión con Google');
                    setMostrarModal(true);
                  }
                } catch {
                  setMensaje('Error al conectar con el servidor (Google)');
                  setMostrarModal(true);
                }
              }}
              onError={() => {
                setMensaje('Error al iniciar sesión con Google');
                setMostrarModal(true);
              }}
            />
          </div>
        </div>

        <div className="left-panel">
          <h1>Panel Admin</h1>
          <p>Inicia sesión para gestionar rutas, usuarios y más.</p>
          <div className="button-container">
            <Link to="/registro-administrador" className="small-button">Registrarse</Link>
          </div>
        </div>
      </div>

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

export default LoginAdministrador;
