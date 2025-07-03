import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiPlus } from 'react-icons/fi';
import '../../assets/crearR.css';
import { CButton, CCol, CForm, CFormInput, CFormTextarea, CFormSelect } from '@coreui/react';

const CrearRuta = () => {
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState({
    nombre: '',
    descripcion: '',
    hora_inicio: '',
    hora_fin: '',
    empresaId: '',
    ida: '',
    retorno: ''
  });
  const [errores, setErrores] = useState({
    nombre: '',
    descripcion: '',
    hora_inicio: '',
    hora_fin: '',
    empresaId: '',
    ida: '',
    retorno: ''
  });
  const [mensajeExito, setMensajeExito] = useState('');
  const [showIdaOptions, setShowIdaOptions] = useState(false);
  const [showRetornoOptions, setShowRetornoOptions] = useState(false);
  const [showIdaTooltip, setShowIdaTooltip] = useState(false);
  const [showRetornoTooltip, setShowRetornoTooltip] = useState(false);
  const [selectedIdaBarrios, setSelectedIdaBarrios] = useState([]);
  const [selectedRetornoBarrios, setSelectedRetornoBarrios] = useState([]);

  // Opciones predefinidas para los puntos
  const opcionesPuntos = [
    'Barrio Bolívar',
    
  ];

  // Opciones de empresas (puedes cargar esto desde el backend)
  const opcionesEmpresas = [
    { id: 1, nombre: 'Empresa A' },
    { id: 2, nombre: 'Empresa B' },
    { id: 3, nombre: 'Empresa C' }
  ];

  const validarCampo = (name, value) => {
    let error = '';
    if (name === 'nombre') {
      if (!value.trim()) error = 'El nombre de la ruta es obligatorio.';
      else if (value.length < 2 || value.length > 50) error = 'El nombre de la ruta debe tener entre 2 y 50 caracteres.';
    }
    if (name === 'descripcion') {
      if (!value.trim()) error = 'La descripción es obligatoria.';
      else if (value.length < 10 || value.length > 500) error = 'La descripción debe tener entre 10 y 500 caracteres.';
    }
    if (name === 'hora_inicio') {
      if (!value.trim()) error = 'La hora de inicio es obligatoria.';
    }
    if (name === 'hora_fin') {
      if (!value.trim()) error = 'La hora de fin es obligatoria.';
    }
    if (name === 'empresaId') {
      if (!value) error = 'Debe seleccionar una empresa.';
    }
    if (name === 'ida') {
      if (selectedIdaBarrios.length === 0) error = 'Debe seleccionar al menos un punto de ida.';
    }
    if (name === 'retorno') {
      if (selectedRetornoBarrios.length === 0) error = 'Debe seleccionar al menos un punto de retorno.';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({ ...prev, [name]: value }));
    setErrores(prev => ({ ...prev, [name]: validarCampo(name, value) }));
  };

  const handleIconClick = (field) => {
    if (field === 'ida') {
      setShowIdaOptions(!showIdaOptions);
      setShowRetornoOptions(false);
    } else if (field === 'retorno') {
      setShowRetornoOptions(!showRetornoOptions);
      setShowIdaOptions(false);
    }
  };

  const handleIconMouseEnter = (field) => {
    if (field === 'ida') {
      setShowIdaTooltip(true);
    } else if (field === 'retorno') {
      setShowRetornoTooltip(true);
    }
  };

  const handleIconMouseLeave = (field) => {
    if (field === 'ida') {
      setShowIdaTooltip(false);
    } else if (field === 'retorno') {
      setShowRetornoTooltip(false);
    }
  };

  const selectOption = (option, field) => {
    if (field === 'ida') {
      setSelectedIdaBarrios(prev => {
        if (prev.includes(option)) {
          return prev.filter(item => item !== option);
        } else {
          return [...prev, option];
        }
      });
    } else if (field === 'retorno') {
      setSelectedRetornoBarrios(prev => {
        if (prev.includes(option)) {
          return prev.filter(item => item !== option);
        } else {
          return [...prev, option];
        }
      });
    }
  };

  const removeBarrio = (barrio, field) => {
    if (field === 'ida') {
      setSelectedIdaBarrios(prev => prev.filter(item => item !== barrio));
    } else if (field === 'retorno') {
      setSelectedRetornoBarrios(prev => prev.filter(item => item !== barrio));
    }
  };

  const getOrderedOptions = (field) => {
    const selectedBarrios = field === 'ida' ? selectedIdaBarrios : selectedRetornoBarrios;
    const unselectedOptions = opcionesPuntos.filter(option => !selectedBarrios.includes(option));
    return [...selectedBarrios, ...unselectedOptions];
  };

  const formatSelectedBarrios = (barrios) => {
    return barrios.map((barrio, index) => (
      <span key={index} className="selected-barrio-tag">
        {barrio}
        <button
          type="button"
          className="remove-barrio-btn"
          onClick={(e) => {
            e.stopPropagation();
            removeBarrio(barrio, barrios === selectedIdaBarrios ? 'ida' : 'retorno');
          }}
        >
          ×
        </button>
      </span>
    ));
  };

  const cerrarSesion = () => {
    localStorage.removeItem('tokenAdmin');
    navigate('/login-administrador');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito('');

    // Preparar datos para enviar
    const datosEnviar = {
      ...formulario,
      ida: selectedIdaBarrios,
      retorno: selectedRetornoBarrios
    };

    // Validar todos los campos antes de enviar
    const nuevosErrores = {
      nombre: validarCampo('nombre', formulario.nombre),
      descripcion: validarCampo('descripcion', formulario.descripcion),
      hora_inicio: validarCampo('hora_inicio', formulario.hora_inicio),
      hora_fin: validarCampo('hora_fin', formulario.hora_fin),
      empresaId: validarCampo('empresaId', formulario.empresaId),
      ida: validarCampo('ida', formulario.ida),
      retorno: validarCampo('retorno', formulario.retorno)
    };
    setErrores(nuevosErrores);

    const hayErrores = Object.values(nuevosErrores).some(msg => msg);
    if (hayErrores) return;

    try {
      const token = localStorage.getItem('tokenAdmin');
      const res = await axios.post(
        'http://localhost:3000/api/rutas/crear',
        datosEnviar,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMensajeExito(res.data.mensaje);
      setFormulario({
        nombre: '',
        descripcion: '',
        hora_inicio: '',
        hora_fin: '',
        empresaId: '',
        ida: '',
        retorno: ''
      });
      setSelectedIdaBarrios([]);
      setSelectedRetornoBarrios([]);
      setErrores({
        nombre: '',
        descripcion: '',
        hora_inicio: '',
        hora_fin: '',
        empresaId: '',
        ida: '',
        retorno: ''
      });
      navigate('/administrador/listarR');
    } catch (err) {
      const mensaje = err.response?.data?.mensaje || 'Error al crear ruta.';
      alert(mensaje);
    }
  };

  return (
    <div className="crear-ruta-page">
      <header>
        <div className="logo">RouWhite</div>
        <nav>
          <ul>
            <li><a href="/administrador/dashboarAdmin">Inicio</a></li>
            <li><a href="#">Listado Rutas</a></li>
            <li><a href="#" onClick={() => navigate('/crear-ruta')}>Crear Ruta</a></li>
            <li><a href="/administrador/listarParaderos">Listado Paraderos</a></li>
            <li><a href="/administrador/crearParadero" onClick={() => navigate('/crear-paradero')}>Crear Paraderos</a></li>
            <li><a href="#">Perfil</a></li>
          </ul>
        </nav>
        <button className="login-btn" onClick={cerrarSesion}>Cerrar sesión</button>
      </header>

      <main className="crear-ruta-main">
        <h2>Crear Ruta</h2>

        {mensajeExito && <p className="mensaje-exito">{mensajeExito}</p>}

        <CForm onSubmit={handleSubmit} className="row g-3 form-ruta">
          <CCol md={6}>
            <CFormInput
              type="text"
              name="nombre"
              label="Nombre de la Ruta"
              placeholder="Ej: 1TP, Ruta Norte, etc."
              value={formulario.nombre}
              onChange={handleChange}
              required
              feedbackInvalid={errores.nombre}
              invalid={!!errores.nombre}
            />
            {errores.nombre && <p className="error">{errores.nombre}</p>}
          </CCol>

          <CCol md={6}>
            <CFormSelect
              name="empresaId"
              label="Empresa"
              value={formulario.empresaId}
              onChange={handleChange}
              required
              feedbackInvalid={errores.empresaId}
              invalid={!!errores.empresaId}
            >
              <option value="">Seleccione una empresa</option>
              {opcionesEmpresas.map(empresa => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.nombre}
                </option>
              ))}
            </CFormSelect>
            {errores.empresaId && <p className="error">{errores.empresaId}</p>}
          </CCol>

          <CCol md={6}>
            <CFormInput
              type="time"
              name="hora_inicio"
              label="Hora de Inicio"
              value={formulario.hora_inicio}
              onChange={handleChange}
              required
              feedbackInvalid={errores.hora_inicio}
              invalid={!!errores.hora_inicio}
            />
            {errores.hora_inicio && <p className="error">{errores.hora_inicio}</p>}
          </CCol>

          <CCol md={6}>
            <CFormInput
              type="time"
              name="hora_fin"
              label="Hora de Fin"
              value={formulario.hora_fin}
              onChange={handleChange}
              required
              feedbackInvalid={errores.hora_fin}
              invalid={!!errores.hora_fin}
            />
            {errores.hora_fin && <p className="error">{errores.hora_fin}</p>}
          </CCol>

          <CCol xs={12}>
            <div className="input-with-icon">
              <div className="custom-input-container">
                <div className="selected-barrios-display">
                  {selectedIdaBarrios.length > 0 ? (
                    formatSelectedBarrios(selectedIdaBarrios)
                  ) : (
                    <span className="placeholder-text">Puntos de ida de la ruta</span>
                  )}
                </div>
                <div className="icon-container">
                  <FiPlus
                    className="input-icon clickable-icon left-icon"
                    onClick={() => handleIconClick('ida')}
                    onMouseEnter={() => handleIconMouseEnter('ida')}
                    onMouseLeave={() => handleIconMouseLeave('ida')}
                  />
                  {showIdaTooltip && (
                    <div className="custom-tooltip">
                      Agregar Puntos
                    </div>
                  )}
                </div>
              </div>
              <label className="form-label">Puntos de Ida</label>
              {showIdaOptions && (
                <div className="options-dropdown">
                  {getOrderedOptions('ida').map((opcion, index) => {
                    const isSelected = selectedIdaBarrios.includes(opcion);
                    return (
                      <div
                        key={index}
                        className={`option-item ${isSelected ? 'selected-option' : ''}`}
                        onClick={() => selectOption(opcion, 'ida')}
                      >
                        {isSelected && <span className="order-badge">{selectedIdaBarrios.indexOf(opcion) + 1}</span>}
                        {opcion}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {errores.ida && <p className="error">{errores.ida}</p>}
          </CCol>

          <CCol xs={12}>
            <div className="input-with-icon">
              <div className="custom-input-container">
                <div className="selected-barrios-display">
                  {selectedRetornoBarrios.length > 0 ? (
                    formatSelectedBarrios(selectedRetornoBarrios)
                  ) : (
                    <span className="placeholder-text">Puntos de retorno de la ruta</span>
                  )}
                </div>
                <div className="icon-container">
                  <FiPlus
                    className="input-icon clickable-icon left-icon"
                    onClick={() => handleIconClick('retorno')}
                    onMouseEnter={() => handleIconMouseEnter('retorno')}
                    onMouseLeave={() => handleIconMouseLeave('retorno')}
                  />
                  {showRetornoTooltip && (
                    <div className="custom-tooltip">
                      Agregar Puntos
                    </div>
                  )}
                </div>
              </div>
              <label className="form-label">Puntos de Retorno</label>
              {showRetornoOptions && (
                <div className="options-dropdown">
                  {getOrderedOptions('retorno').map((opcion, index) => {
                    const isSelected = selectedRetornoBarrios.includes(opcion);
                    return (
                      <div
                        key={index}
                        className={`option-item ${isSelected ? 'selected-option' : ''}`}
                        onClick={() => selectOption(opcion, 'retorno')}
                      >
                        {isSelected && <span className="order-badge">{selectedRetornoBarrios.indexOf(opcion) + 1}</span>}
                        {opcion}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            {errores.retorno && <p className="error">{errores.retorno}</p>}
          </CCol>

          <CCol xs={12}>
            <CFormTextarea
              name="descripcion"
              label="Descripción de la Ruta"
              placeholder="Descripción detallada de la ruta"
              value={formulario.descripcion}
              onChange={handleChange}
              required
              feedbackInvalid={errores.descripcion}
              invalid={!!errores.descripcion}
              rows={4}
            />
            {errores.descripcion && <p className="error">{errores.descripcion}</p>}
          </CCol>

          <CCol xs={12}>
            <CButton color="primary" type="submit">
              Crear Ruta
            </CButton>
          </CCol>
        </CForm>
      </main>
    </div>
  );
};

export default CrearRuta;
