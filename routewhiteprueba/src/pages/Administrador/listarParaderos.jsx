import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


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

  return (
    <main style={{ padding: '100px 5%' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#FA812F' }}>
        Listado de Paraderos
      </h1>
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
  );
};

export default ListarParaderos;
