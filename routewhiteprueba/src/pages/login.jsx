import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../assets/login.css';

const Login = () => {
  const navigate = useNavigate();

  const [datos, setDatos] = useState({
    email: '',
    contrasena: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/api/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          alert('Login exitoso');
          localStorage.setItem('token', data.token);
          navigate('/dashboard'); // Redireccionar a donde desees después de login
        } else {
          alert(data.msg || 'Credenciales incorrectas');
        }
      })
      .catch(() => alert('Error al conectar con el servidor'));
  };

  return (
  <div className="login-wrapper">
    <div className="container">
      <div className="left-panel">
        <h1>Bienvenidos a RouWhite</h1>
        <p>Accede con tu cuenta para gestionar tus rutas y más.</p>

        <div className="button-container">
          <Link to="/registro" className="small-button">Register</Link>
        </div>
      </div>

      <div className="right-panel">
        <h2>USER LOGIN</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
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
            <input
              type="password"
              name="contrasena"
              placeholder="Contraseña"
              value={datos.contrasena}
              onChange={handleChange}
              required
            />
          </div>

          <div className="options">
            <label><input type="checkbox" /> Remember me</label>
            <a href="#">Forgot password?</a>
          </div>

          <button type="submit">LOGIN</button>
        </form>
      </div>
    </div>
  </div>
);

}
export default Login;
