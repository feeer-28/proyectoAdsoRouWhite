import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../../../styles/admin/paraderos/listarParaderos.css';

const ListarParaderos = () => {
  const [paraderos, setParaderos] = useState([]);
  const [editParadero, setEditParadero] = useState(null);
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchParaderos();
  }, []);

  const fetchParaderos = () => {
    const token = localStorage.getItem('tokenAdmin');
    fetch('http://localhost:3000/api/paraderos/obtener', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setParaderos(data))
      .catch(err => console.error('Error al obtener paraderos:', err));
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar este paradero?')) {
      const token = localStorage.getItem('tokenAdmin');
      fetch(`http://localhost:3000/api/paraderos/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(() => fetchParaderos())
        .catch(err => alert('Error al eliminar'));
    }
  };

  const handleEdit = (paradero) => {
    setEditParadero(paradero);
    setForm({ ...paradero });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('tokenAdmin');
    fetch(`http://localhost:3000/api/paraderos/${form.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => {
        setEditParadero(null);
        fetchParaderos();
      })
      .catch(err => alert('Error al actualizar'));
  };

  return (
    <main className="listar-paraderos-main">
      <h1 className="listar-paraderos-title">Listado de Paraderos</h1>
      <div className="listar-paraderos-wrapper">
        <div className="tabla-centro">
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
                    <button className="icon-btn" onClick={() => handleEdit(p)}><FaEdit /></button>
                    <button className="icon-btn" onClick={() => handleDelete(p.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editParadero && (
        <div className="listar-paraderos-modal-overlay">
          <form className="listar-paraderos-modal-form" onSubmit={handleUpdate}>
            <h2>Actualizar Paradero</h2>
            <label>ID</label>
            <input name="id" value={form.id} readOnly />
            <label>Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} />
            <label>Latitud</label>
            <input name="latitud" value={form.latitud} onChange={handleChange} />
            <label>Longitud</label>
            <input name="longitud" value={form.longitud} onChange={handleChange} />
            <div className="listar-paraderos-modal-actions">
              <button type="button" className="icon-btn" onClick={() => setEditParadero(null)}>Cancelar</button>
              <button type="submit" className="icon-btn"><FaEdit /> Guardar</button>
            </div>
          </form>
        </div>
      )}
    </main>
  );
};

export default ListarParaderos;
