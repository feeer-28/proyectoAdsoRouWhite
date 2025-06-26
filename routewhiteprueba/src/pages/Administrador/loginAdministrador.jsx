import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../../assets/login.css';


const LoginAdministrador = () => {
  const navigate = useNavigate();
  const [datos, setDatos] = useState({
    correo: '',         
    contrasena: ''        
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    try {
      const res = await fetch('http://localhost:3000/api/register/login/admin', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      const data = await res.json();

      if (res.ok) {
          localStorage.setItem('tokenAdmin', data.token);
        console.log("Usuario logueado:", data.usuario);
        navigate('/administrador/dashboarAdmin'); 
      } else {
        setMensaje(data.mensaje || 'Credenciales incorrectas');
      }
    } catch (error) {
      setMensaje('Error al conectar con el servidor');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="right-panel">
          <h2>Login Administrador</h2>
          {mensaje && <p style={{ color: 'red', marginBottom: '10px' }}>{mensaje}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <input
                type="email"
                name="correo" // ✅ nombre correcto
                placeholder="Correo electrónico"
                value={datos.correo}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="contrasena" // ✅ nombre correcto
                placeholder="Contraseña"
                value={datos.contrasena}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Iniciar sesión</button>
          </form>
        </div>

        <div className="left-panel">
          <h1>Panel Admin</h1>
          <p>Inicia sesión para gestionar rutas, usuarios y más.</p>
          <div className="button-container">
            <Link to="/registro-administrador" className="small-button">Registrarse</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginAdministrador;
