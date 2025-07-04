// src/components/crearR.jsx

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { FiPlus } from 'react-icons/fi'
import SidebarAdmin from './sidebarAdmin'
import '../../assets/crearR.css'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'

// Sólo cambias tu frontend: apuntas a tu backend en el puerto 3000
axios.defaults.baseURL = 'http://localhost:3000'

const CrearRuta = () => {
  const navigate = useNavigate()

  // datos que vienen del backend
  const [empresas, setEmpresas]   = useState([])
  const [paraderos, setParaderos] = useState([])

  // estado del formulario
  const [form, setForm] = useState({
    nombre: '',
    descripcion: '',
    hora_inicio: '',
    hora_fin: '',
    empresaId: '',
  })

  // lista de ids seleccionados
  const [idaList, setIdaList]     = useState([])
  const [retList, setRetList]     = useState([])

  // UI state
  const [errors, setErrors]       = useState({})
  const [msgOk, setMsgOk]         = useState('')
  const [showIda, setShowIda]     = useState(false)
  const [showRet, setShowRet]     = useState(false)
  const [tipIda, setTipIda]       = useState(false)
  const [tipRet, setTipRet]       = useState(false)

  // carga inicial de empresas y paraderos
  useEffect(() => {
    const token = localStorage.getItem('tokenAdmin')

    axios
      .get('/api/empresas/listar', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setEmpresas(Array.isArray(r.data) ? r.data : []))
      .catch(() => setEmpresas([]))

    axios
      .get('/api/paraderos', { headers: { Authorization: `Bearer ${token}` } })
      .then(r => setParaderos(Array.isArray(r.data) ? r.data : []))
      .catch(() => setParaderos([]))
  }, [navigate])

  const validate = (field, val) => {
    switch (field) {
      case 'nombre':
        if (!val.trim())           return 'El nombre es obligatorio.'
        if (val.trim().length < 3) return 'Mínimo 3 caracteres.'
        return ''
      case 'hora_inicio': if (!val) return 'Hora de inicio es obligatoria.'
                          return ''
      case 'hora_fin':    if (!val) return 'Hora de fin es obligatoria.'
                          return ''
      case 'empresaId':   if (!val) return 'Selecciona una empresa.'
                          return ''
      case 'ida':         if (idaList.length === 0) return 'Agrega puntos de ida.'
                          return ''
      case 'retorno':     if (retList.length === 0) return 'Agrega puntos de retorno.'
                          return ''
      default: return ''
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(errs => ({ ...errs, [name]: validate(name, value) }))
  }

  const toggleDropdown = fld => {
    if (fld === 'ida') {
      setShowIda(v => !v); setShowRet(false)
    } else {
      setShowRet(v => !v); setShowIda(false)
    }
  }

  const addRemove = (id, fld) => {
    if (fld === 'ida') {
      setIdaList(prev =>
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      )
    } else {
      setRetList(prev =>
        prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
      )
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

    // validaciones
    const errs = {
      nombre: validate('nombre', form.nombre),
      hora_inicio: validate('hora_inicio', form.hora_inicio),
      hora_fin: validate('hora_fin', form.hora_fin),
      empresaId: validate('empresaId', form.empresaId),
      ida: validate('ida', idaList),
      retorno: validate('retorno', retList),
    }
    setErrors(errs)
    if (Object.values(errs).some(x => x)) return

    // envío
    try {
      const token = localStorage.getItem('tokenAdmin')
      const payload = {
        ...form,
        ida: idaList,
        retorno: retList,
      }
      const res = await axios.post('/api/rutas/crear', payload, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setMsgOk(res.data.mensaje || 'Ruta creada.')
      // reset
      setForm({
        nombre: '',
        descripcion: '',
        hora_inicio: '',
        hora_fin: '',
        empresaId: '',
      })
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

          {/* Nombre */}
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

          {/* Empresa */}
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

          {/* Horas */}
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

          {/* Puntos de Ida */}
          <CCol xs={12}>
            <div className="input-with-icon">
              <div className="custom-input-container">
                <div className="selected-barrios-display">
                  {idaList.length
                    ? renderTags(idaList, 'ida')
                    : <span className="placeholder-text">Selecciona puntos de ida</span>}
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
                      <div
                        key={id}
                        className={`option-item ${sel ? 'selected-option' : ''}`}
                        onClick={() => addRemove(id, 'ida')}
                      >
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

          {/* Puntos de Retorno */}
          <CCol xs={12}>
            <div className="input-with-icon">
              <div className="custom-input-container">
                <div className="selected-barrios-display">
                  {retList.length
                    ? renderTags(retList, 'retorno')
                    : <span className="placeholder-text">Selecciona puntos de retorno</span>}
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
                      <div
                        key={id}
                        className={`option-item ${sel ? 'selected-option' : ''}`}
                        onClick={() => addRemove(id, 'retorno')}
                      >
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

          {/* Descripción */}
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

          {/* Botón Crear */}
          <CCol xs={12}>
            <CButton color="primary" type="submit">Crear Ruta</CButton>
          </CCol>
        </CForm>
      </main>
    </div>
  )
}

export default CrearRuta
