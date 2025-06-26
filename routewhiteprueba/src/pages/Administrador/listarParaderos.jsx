import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../assets/dashboardAdmin.css';

const ListarParaderos = () => {
  const [paraderos, setParaderos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('tokenAdmin');
    fetch('http://localhost:3000/api/paraderos/obtener', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setParaderos(data))
      .catch(err => console.error('Error al obtener paraderos:', err));
  }, []);

  const handleListarRutas = () => {
    navigate('/listar-rutas');
  };

  return (
    <div className="listar-paraderos">
      <header>
        <div className="logo">RouWhite</div>
        <nav>
          <ul>
            <li><a href="/administrador/dashboarAdmin">Inicio</a></li>
            <li><a href="#" >Listado Rutas</a></li>
            <li><a href="#">Crear Ruta</a></li>
            <li><a href="/administrador/listarParaderos">Listado Paraderos</a></li>
            <li><a href="/administrador/crearParadero">Crear Paraderos</a></li>
            <li><a href="#">Perfil</a></li>
          </ul>
        </nav>
        <button className="login-btn" onClick={() => {
          localStorage.removeItem('tokenAdmin');
          window.location.href = '/login-administrador';
        }}>Cerrar sesión</button>
      </header>

      <main style={{ padding: '100px 5%' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#FA812F' }}>Listado de Paraderos</h1>
        <table className="paraderos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Latitud</th>
              <th>Longitud</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {paraderos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.latitud}</td>
                <td>{p.longitud}</td>
                <td>
                  <button className="icon-btn"><FaEdit /></button>
                  <button className="icon-btn"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ListarParaderos;