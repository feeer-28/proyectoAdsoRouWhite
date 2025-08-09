// src/components/crearR.jsx

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiPlus } from 'react-icons/fi'
import SidebarAdmin from "../sidebar/sidebarAdmin";
import "../../../styles/admin/rutas/crearR.css";
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'

// Apunta tu frontend al backend en el puerto 3000
axios.defaults.baseURL = 'http://localhost:3000'

const CrearRuta = () => {
  const navigate = useNavigate()

  const [empresas, setEmpresas] = useState([])
  const [paraderos, setParaderos] = useState([])

  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    hora_inicio: '',
    hora_fin: '',
    empresaId: '',
  })
  const [idaList, setIdaList] = useState([])
  const [retList, setRetList] = useState([])
  const [errors, setErrors] = useState({})
  const [msgOk, setMsgOk] = useState('')
  const [showIda, setShowIda] = useState(false)
  const [showRet, setShowRet] = useState(false)
  const [tipIda, setTipIda] = useState(false)
  const [tipRet, setTipRet] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('tokenAdmin')

    // Carga de empresas
    axios
      .get('/api/empresas/listar', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setEmpresas(Array.isArray(res.data) ? res.data : []))
      .catch(() => setEmpresas([]))

    // Carga de paraderos — ajusta a "/listar" si tu router lo define así
    axios
      .get('/api/paraderos/listar', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setParaderos(Array.isArray(res.data) ? res.data : []))
      .catch(() =>
        // intenta sin "/listar" si sigues recibiendo []
        axios
          .get('/api/paraderos/obtener', { headers: { Authorization: `Bearer ${token}` } })
          .then(r => setParaderos(Array.isArray(r.data) ? r.data : []))
          .catch(() => setParaderos([]))
      )
  }, [navigate])

  const validate = (field) => {
    switch (field) {
      case 'nombre':
        if (!form.nombre.trim()) return 'El nombre es obligatorio.'
        if (form.nombre.trim().length < 3) return 'Mínimo 3 caracteres.'
        return ''
      case 'hora_inicio':
        return form.hora_inicio ? '' : 'Hora de inicio obligatoria.'
      case 'hora_fin':
        return form.hora_fin ? '' : 'Hora de fin obligatoria.'
      case 'empresaId':
        return form.empresaId ? '' : 'Selecciona una empresa.'
      case 'ida':
        return idaList.length ? '' : 'Agrega puntos de ida.'
      case 'retorno':
        return retList.length ? '' : 'Agrega puntos de retorno.'
      default:
        return ''
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(errs => ({ ...errs, [name]: validate(name) }))
  }

  const toggleDropdown = fld => {
    if (fld === 'ida') {
      setShowIda(v => !v)
      setShowRet(false)
    } else {
      setShowRet(v => !v)
      setShowIda(false)
    }
  }

  const addRemove = (id, fld) => {
    if (fld === 'ida') {
      setIdaList(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))
    } else {
      setRetList(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]))
    }
  }

  const ordered = fld => {
    const sel = fld === 'ida' ? idaList : retList
    const rest = paraderos.map(p => p.id).filter(x => !sel.includes(x))
    return [...sel, ...rest]
  }

  const renderTags = (arr, fld) =>
    arr.map(id => {
      const p = paraderos.find(x => x.id === id) || {}
      return (
        <span key={id} className="selected-barrio-tag">
          {p.nombre}
          <button
            type="button"
            className="remove-barrio-btn"
            onClick={e => {
              e.stopPropagation()
              addRemove(id, fld)
            }}
          >
            ×
          </button>
        </span>
      )
    })

  const handleSubmit = async e => {
    e.preventDefault()
    setMsgOk('')

    const errs = {
      nombre: validate('nombre'),
      hora_inicio: validate('hora_inicio'),
      hora_fin: validate('hora_fin'),
      empresaId: validate('empresaId'),
      ida: validate('ida'),
      retorno: validate('retorno'),
    }
    setErrors(errs)
    if (Object.values(errs).some(x => x)) return

    try {
      const token = localStorage.getItem('tokenAdmin')
      const payload = { ...form, ida: idaList, retorno: retList }
      const res = await axios.post('/api/rutas/crear', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setMsgOk(res.data.mensaje || 'Ruta creada.')
      setForm({ nombre: '', descripcion: '', hora_inicio: '', hora_fin: '', empresaId: '' })
      setIdaList([])
      setRetList([])
      setErrors({})
      setTimeout(() => navigate('/administrador/listarR'), 800)
    } catch (err) {
      const msgs = err.response?.data?.errores || [err.message]
      alert(msgs.join('\n'))
    }
  }

  return (
    <div className="crear-ruta-page">
      <SidebarAdmin />
      <main className="crear-ruta-main">
        <h2>Crear Ruta</h2>
        {msgOk && <p className="mensaje-exito">{msgOk}</p>}
        <CForm onSubmit={handleSubmit} className="row g-3 form-ruta">
          <CCol md={6}>
            <CFormInput
              name="nombre"
              label="Nombre de la Ruta"
              placeholder="Ej: Ruta Centro"
              value={form.nombre}
              onChange={handleChange}
              invalid={!!errors.nombre}
              feedbackInvalid={errors.nombre}
            />
          </CCol>
          <CCol md={6}>
            <CFormSelect
              name="empresaId"
              label="Empresa"
              value={form.empresaId}
              onChange={handleChange}
              invalid={!!errors.empresaId}
              feedbackInvalid={errors.empresaId}
            >
              <option value="">Selecciona empresa</option>
              {empresas.map(e => (
                <option key={e.id} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </CFormSelect>
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="time"
              name="hora_inicio"
              label="Hora de Inicio"
              value={form.hora_inicio}
              onChange={handleChange}
              invalid={!!errors.hora_inicio}
              feedbackInvalid={errors.hora_inicio}
            />
          </CCol>
          <CCol md={6}>
            <CFormInput
              type="time"
              name="hora_fin"
              label="Hora de Fin"
              value={form.hora_fin}
              onChange={handleChange}
              invalid={!!errors.hora_fin}
              feedbackInvalid={errors.hora_fin}
            />
          </CCol>
          <CCol xs={12}>
            <div className="input-with-icon">
              <div className="custom-input-container">
                <div className="selected-barrios-display">
                  {idaList.length ? renderTags(idaList, 'ida') : <span className="placeholder-text">Selecciona puntos de ida</span>}
                </div>
                <div className="icon-container">
                  <FiPlus
                    className="input-icon clickable-icon"
                    onClick={() => toggleDropdown('ida')}
                    onMouseEnter={() => setTipIda(true)}
                    onMouseLeave={() => setTipIda(false)}
                  />
                  {tipIda && <div className="custom-tooltip">Agregar puntos de ida</div>}
                </div>
              </div>
              <label className="form-label">Puntos de Ida</label>
              {showIda && (
                <div className="options-dropdown">
                  {ordered('ida').map(id => {
                    const p = paraderos.find(x => x.id === id) || {}
                    const sel = idaList.includes(id)
                    return (
                      <div key={id} className={`option-item ${sel ? 'selected-option' : ''}`} onClick={() => addRemove(id, 'ida')}>
                        {sel && <span className="order-badge">{idaList.indexOf(id) + 1}</span>}
                        {p.nombre}
                      </div>
                    )
                  })}
                </div>
              )}
              {errors.ida && <p className="error">{errors.ida}</p>}
            </div>
          </CCol>
          <CCol xs={12}>
            <div className="input-with-icon">
              <div className="custom-input-container">
                <div className="selected-barrios-display">
                  {retList.length ? renderTags(retList, 'retorno') : <span className="placeholder-text">Selecciona puntos de retorno</span>}
                </div>
                <div className="icon-container">
                  <FiPlus
                    className="input-icon clickable-icon"
                    onClick={() => toggleDropdown('retorno')}
                    onMouseEnter={() => setTipRet(true)}
                    onMouseLeave={() => setTipRet(false)}
                  />
                  {tipRet && <div className="custom-tooltip">Agregar puntos de retorno</div>}
                </div>
              </div>
              <label className="form-label">Puntos de Retorno</label>
              {showRet && (
                <div className="options-dropdown">
                  {ordered('retorno').map(id => {
                    const p = paraderos.find(x => x.id === id) || {}
                    const sel = retList.includes(id)
                    return (
                      <div key={id} className={`option-item ${sel ? 'selected-option' : ''}`} onClick={() => addRemove(id, 'retorno')}>
                        {sel && <span className="order-badge">{retList.indexOf(id) + 1}</span>}
                        {p.nombre}
                      </div>
                    )
                  })}
                </div>
              )}
              {errors.retorno && <p className="error">{errors.retorno}</p>}
            </div>
          </CCol>
          <CCol xs={12}>
            <CFormTextarea
              name="descripcion"
              label="Descripción"
              placeholder="Detalles de la ruta…"
              rows={4}
              value={form.descripcion}
              onChange={handleChange}
              invalid={!!errors.descripcion}
              feedbackInvalid={errors.descripcion}
            />
          </CCol>
          <CCol xs={12}>
            <CButton color="primary" type="submit">Crear Ruta</CButton>
          </CCol>
        </CForm>
      </main>
    </div>
  )
}

export default CrearRuta
