import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../assets/crearParadero.css';

const CrearParadero = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: '',
    direccion: '',
    latitud: '',
    longitud: ''
  });
  const [errores, setErrores] = useState({
    nombre: '',
    direccion: '',
    latitud: '',
    longitud: ''
  });
  const [mensajeExito, setMensajeExito] = useState('');

  const validarCampo = (name, value) => {
    let error = '';
    if (name === 'nombre') {
      if (!value.trim()) error = 'El nombre es obligatorio.';
      else if (value.length < 3 || value.length > 100) error = 'El nombre debe tener entre 3 y 100 caracteres.';
    }
    if (name === 'direccion') {
      if (!value.trim()) error = 'La dirección es obligatoria.';
      else if (value.length < 5 || value.length > 200) error = 'La dirección debe tener entre 5 y 200 caracteres.';
    }
    if (name === 'latitud') {
      const num = parseFloat(value);
      if (isNaN(num)) error = 'La latitud debe ser un número.';
      else if (num < -90 || num > 90) error = 'La latitud debe estar entre -90 y 90.';
    }
    if (name === 'longitud') {
      const num = parseFloat(value);
      if (isNaN(num)) error = 'La longitud debe ser un número.';
      else if (num < -180 || num > 180) error = 'La longitud debe estar entre -180 y 180.';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
    setErrores(prev => ({ ...prev, [name]: validarCampo(name, value) }));
  };

  const cerrarSesion = () => {
    localStorage.removeItem('tokenAdmin');
    navigate('/login-administrador');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito('');

    const nuevosErrores = {
      nombre: validarCampo('nombre', formulario.nombre),
      direccion: validarCampo('direccion', formulario.direccion),
      latitud: validarCampo('latitud', formulario.latitud),
      longitud: validarCampo('longitud', formulario.longitud)
    };
    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some(msg => msg);
    if (hayErrores) return;

    try {
      const token = localStorage.getItem('tokenAdmin');
      const res = await axios.post(
        'http://localhost:3000/api/paraderos',
        formulario,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensajeExito(res.data.mensaje);
      setFormulario({ nombre: '', direccion: '', latitud: '', longitud: '' });
      setErrores({ nombre: '', direccion: '', latitud: '', longitud: '' });
    } catch (err) {
      const mensaje = err.response?.data?.mensaje || 'Error al crear paradero.';
      alert(mensaje);
    }
  };

  return (
    <main className="crear-paradero-main">
      <h2>Crear Paradero</h2>

      {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}

      <form onSubmit={handleSubmit} className="form-paradero">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre del paradero"
          value={formulario.nombre}
          onChange={handleChange}
          required
        />
        {errores.nombre && <p className="error">{errores.nombre}</p>}

        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={formulario.direccion}
          onChange={handleChange}
          required
        />
        {errores.direccion && <p className="error">{errores.direccion}</p>}

        <input
          type="number"
          step="any"
          name="latitud"
          placeholder="Latitud"
          value={formulario.latitud}
          onChange={handleChange}
          required
        />
        {errores.latitud && <p className="error">{errores.latitud}</p>}

        <input
          type="number"
          step="any"
          name="longitud"
          placeholder="Longitud"
          value={formulario.longitud}
          onChange={handleChange}
          required
        />
        {errores.longitud && <p className="error">{errores.longitud}</p>}

        <button type="submit">Crear</button>
      </form>
    </main>
  );
};

export default CrearParadero;
