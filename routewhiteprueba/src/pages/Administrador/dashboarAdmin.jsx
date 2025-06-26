import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/dashboardAdmin.css';
import ListarParaderos from './listarParaderos';

const DashboardAdmin = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('tokenAdmin');
    if (!token) {
      navigate('/login-administrador');
      return;
    }

    const obtenerDatos = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/register/admin/dashboard', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await res.json();

        if (res.ok) {
          setAdmin(data.usuario);
          setMensaje(data.mensaje);
        } else {
          localStorage.removeItem('tokenAdmin');
          navigate('/login-administrador');
        }
      } catch (err) {
        localStorage.removeItem('tokenAdmin');
        navigate('/login-administrador');
      }
    };

    obtenerDatos();
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem('tokenAdmin');
    navigate('/login-administrador');
  };

  const handleCrearParadero = () => {
    navigate('/administrador/crearParadero');
  };
  const handlelistarParadero = () => {
    navigate('/administrador/listarParaderos');
  }
  const handleListarRutas = () => {
    navigate('/listar-rutas');
  };

  return (
    <div>
      <header>
        <div className="logo">RouWhite</div>
        <nav>
          <ul>
            <li><a href="/administrador/dashboarAdmin">Inicio</a></li>
            <li><a href="#">Listado Rutas</a></li>
            <li><a href="#">Crear Ruta</a></li>
            <li><a href="/administrador/listarParaderos" onClick={handlelistarParadero}>Listado Paraderos</a></li>
            <li><a href="/administrador/crearParadero" onClick={handleCrearParadero}>Crear Paraderos</a></li>
            <li><a href="#">Perfil</a></li>
          </ul>
        </nav>
        <button className="login-btn" onClick={cerrarSesion}>Cerrar sesión</button>
      </header>

      <main>
        <section className="content">
          <h1>Rutas<br />Transporte Popayán</h1>
          <p>
            Descubre y consulta fácilmente las rutas de transporte público de Popayán. Encuentra información
            actualizada sobre recorridos, horarios y paraderos para moverte por la ciudad de manera eficiente y
            cómoda.
          </p>
          <button className="demo-btn">NAVEGA</button>
          <div className="pagination">
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </section>

        <section className="image-area"></section>
      </main>
    </div>
  );
};

export default DashboardAdmin;
