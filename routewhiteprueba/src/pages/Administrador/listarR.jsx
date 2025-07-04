import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../assets/listarR.css';


const ListarR = () => {
  const [rutas, setRutas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('tokenAdmin');
    fetch('http://localhost:3001/api/rutas', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setRutas(data))
      .catch(err => console.error('Error al obtener rutas:', err));
  }, []);

  const handleEdit = (id) => {
    console.log('Editar ruta', id);
  };

  const handleDelete = (id) => {
    console.log('Eliminar ruta', id);
  };

  return (
    <main style={{ padding: '100px 5%' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem', color: '#FA812F' }}>
        Listado de Rutas
      </h1>
      <table className="paraderos-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Hora Inicio</th>
            <th>Hora Fin</th>
            <th>Empresa</th>
            <th>Ida</th>
            <th>Retorno</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rutas.map(r => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.nombre}</td>
              <td>{r.descripcion}</td>
              <td>{r.hora_inicio}</td>
              <td>{r.hora_fin}</td>
              <td>{r.empresaId}</td>
              <td>{Array.isArray(r.ida) ? r.ida.join(', ') : r.ida}</td>
              <td>{Array.isArray(r.retorno) ? r.retorno.join(', ') : r.retorno}</td>
              <td>
                <button className="icon-btn" title="Editar" onClick={() => handleEdit(r.id)}><FaEdit /></button>
                <button className="icon-btn" title="Eliminar" onClick={() => handleDelete(r.id)}><FaTrash /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default ListarR;
