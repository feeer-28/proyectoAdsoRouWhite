// src/components/admin/rutas/ListarR.jsx

import React, { useEffect, useState } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import '../../../styles/admin/rutas/listarR.css'


const mockRutas = [
  {
    nombre: 'Ruta 1',
    empresaId: '1',
    descripcion: 'Ruta principal del centro',
    hora_inicio: '06:00',
    hora_fin: '22:00',
    ida: ['101', '102', '103'],
    retorno: ['103', '102', '101'],
  },
  {
    nombre: 'Ruta 2',
    empresaId: '2',
    descripcion: 'Ruta secundaria',
    hora_inicio: '07:00',
    hora_fin: '21:00',
    ida: ['201', '202', '203'],
    retorno: ['203', '202', '201'],
  },
  // Agrega más rutas mock según necesites
]

const ListarR = () => {
  const [rutas, setRutas] = useState([])
  const [empresas, setEmpresas] = useState([])
  const [paraderos, setParaderos] = useState([])

  const [editRuta, setEditRuta] = useState(null)
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    hora_inicio: '',
    hora_fin: '',
    empresaId: '',
    ida: [],
    retorno: [],
  })
  const [idaSeleccionado, setIdaSeleccionado] = useState('')
  const [retornoSeleccionado, setRetornoSeleccionado] = useState('')


  // Handlers robustos para autocompletar y limpiar dependencias
  const handleEmpresaChange = (e) => {
    const empresaId = e.target.value;
    setFormData({
      nombre: '',
      descripcion: '',
      hora_inicio: '',
      hora_fin: '',
      empresaId,
      ida: [],
      retorno: [],
    });
  };

  const handleNombreChange = (e) => {
    const nombre = e.target.value;
    const found = mockRutas.find(
      (r) => r.nombre === nombre && r.empresaId === formData.empresaId
    );
    if (found) {
      setFormData((prev) => ({
        ...prev,
        nombre,
        descripcion: found.descripcion,
        hora_inicio: found.hora_inicio,
        hora_fin: found.hora_fin,
        ida: found.ida,
        retorno: found.retorno,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        nombre,
        descripcion: '',
        hora_inicio: '',
        hora_fin: '',
        ida: [],
        retorno: [],
      }));
    }
  };

  // Normaliza un campo de paraderos que venga como objeto[] o number[]
  const normalizeStops = raw => {
    if (!Array.isArray(raw)) return []
    if (raw.length === 0) return []
    // si ya vienen como objetos
    if (typeof raw[0] === 'object') return raw
    // vienen como ids
    return raw
      .map(id => paraderos.find(p => p.id === id))
      .filter(Boolean)
  }

  useEffect(() => {
    fetchRutas()
    fetchEmpresas()
    fetchParaderos()
  }, [])

  const fetchRutas = async () => {
    const token = localStorage.getItem('tokenAdmin')
    try {
      const res = await fetch('http://localhost:3000/api/rutas/listar', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setRutas(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching rutas', err)
    }
  }

  const fetchEmpresas = async () => {
    const token = localStorage.getItem('tokenAdmin')
    try {
      const res = await fetch('http://localhost:3000/api/empresas/listar', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setEmpresas(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching empresas', err)
    }
  }

  const fetchParaderos = async () => {
    const token = localStorage.getItem('tokenAdmin')
    try {
      const res = await fetch('http://localhost:3000/api/paraderos/obtener', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setParaderos(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error('Error fetching paraderos', err)
    }
  }

  const handleDelete = async id => {
    if (!window.confirm('¿Eliminar esta ruta?')) return
    const token = localStorage.getItem('tokenAdmin')
    try {
      const res = await fetch(`http://localhost:3000/api/rutas/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error()
      setRutas(prev => prev.filter(r => r.id !== id))
    } catch {
      alert('Error al eliminar')
    }
  }

  const handleEdit = ruta => {
    // preseleccionar ida y retorno a partir de raw ids u objetos
    const raw = ruta.paraderos || {}
    const idaObjs = normalizeStops(raw.ida)
    const retornoObjs = normalizeStops(raw.retorno)

    setEditRuta(ruta)
    setFormData({
      nombre: ruta.nombre || '',
      descripcion: ruta.descripcion || '',
      hora_inicio: ruta.hora_inicio || '',
      hora_fin: ruta.hora_fin || '',
      empresaId: ruta.empresa?.id?.toString() || '',
      ida: idaObjs.map(p => p.id.toString()),
      retorno: retornoObjs.map(p => p.id.toString()),
    })
    setIdaSeleccionado('')
    setRetornoSeleccionado('')
  }

  const handleChange = e => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Si cambia nombre o empresaId, los campos se autocompletarán por el useEffect de arriba
  }

  const agregarParadero = tipo => {
    const seleccionado = tipo === 'ida' ? idaSeleccionado : retornoSeleccionado
    if (seleccionado && !formData[tipo].includes(seleccionado)) {
      setFormData(prev => ({
        ...prev,
        [tipo]: [...prev[tipo], seleccionado],
      }))
    }
    if (tipo === 'ida') setIdaSeleccionado('')
    else setRetornoSeleccionado('')
  }

  const quitarParadero = (tipo, id) => {
    setFormData(prev => ({
      ...prev,
      [tipo]: prev[tipo].filter(pid => pid !== id),
    }))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const { nombre, descripcion, hora_inicio, hora_fin, empresaId, ida, retorno } = formData
    const payload = {
      nombre,
      descripcion,
      hora_inicio,
      hora_fin,
      empresaId: Number(empresaId),
      ida: ida.map(Number),
      retorno: retorno.map(Number),
    }

    try {
      const token = localStorage.getItem('tokenAdmin')
      const res = await fetch(`http://localhost:3000/api/rutas/${editRuta.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const errBody = await res.json().catch(() => null)
        throw new Error(errBody?.mensaje || 'Error al actualizar')
      }
      alert('Ruta actualizada correctamente')
      setEditRuta(null)
      fetchRutas()
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="listar-wrapper">
      <main>
        <h1>Listado de Rutas</h1>
        <div className="centered-table-wrapper">
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
              {rutas.length === 0 && (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '2rem' }}>
                    No hay rutas.
                  </td>
                </tr>
              )}
              {rutas.map(r => {
                const raw = r.paraderos || {}
                const idaObjs = normalizeStops(raw.ida)
                const retornoObjs = normalizeStops(raw.retorno)
                const idaNames = idaObjs.map(p => p.nombre).join(', ')
                const retornoNames = retornoObjs.map(p => p.nombre).join(', ')

                return (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.nombre}</td>
                    <td>{r.descripcion}</td>
                    <td>{r.hora_inicio}</td>
                    <td>{r.hora_fin}</td>
                    <td>{r.empresa?.nombre}</td>
                    <td>{idaNames || '—'}</td>
                    <td>{retornoNames || '—'}</td>
                    <td>
                      <button className="icon-btn" onClick={() => handleEdit(r)}>
                        <FaEdit />
                      </button>
                      <button className="icon-btn" onClick={() => handleDelete(r.id)}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </main>

      {editRuta && (
        <div className="modal-overlay">
          <form className="editarR-form" onSubmit={handleSubmit}>
            <h2>Actualizar Ruta</h2>


            <label>Empresa</label>
            <select name="empresaId" value={formData.empresaId} onChange={handleEmpresaChange}>
              <option value="">-- Selecciona Empresa --</option>
              {empresas.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.nombre}
                </option>
              ))}
            </select>

            <label>Nombre</label>
            <select name="nombre" value={formData.nombre} onChange={handleNombreChange} disabled={!formData.empresaId}>
              <option value="">-- Selecciona Ruta --</option>
              {mockRutas
                .filter(r => r.empresaId === formData.empresaId)
                .map((ruta, idx) => (
                  <option key={idx} value={ruta.nombre}>
                    {ruta.nombre}
                  </option>
                ))}
            </select>

            <label>Descripción</label>
            <input name="descripcion" value={formData.descripcion} onChange={handleChange} />

            <label>Hora Inicio</label>
            <input type="time" name="hora_inicio" value={formData.hora_inicio} onChange={handleChange} />

            <label>Hora Fin</label>
            <input type="time" name="hora_fin" value={formData.hora_fin} onChange={handleChange} />

            <label>Empresa</label>
            <select name="empresaId" value={formData.empresaId} onChange={handleChange}>
              <option value="">-- Selecciona Empresa --</option>
              {empresas.map(emp => (
                <option key={emp.id} value={emp.id}>
                  {emp.nombre}
                </option>
              ))}
            </select>
            {/* Cuando quieras cambiar a datos de la base de datos, reemplaza mockRutas por una consulta a la API y usa el mismo formato */}

            <label>Puntos de Ida</label>
            <div className="selector-paradero">
              <select value={idaSeleccionado} onChange={e => setIdaSeleccionado(e.target.value)}>
                <option value="">-- Selecciona paradero --</option>
                {paraderos.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => agregarParadero('ida')}>
                ➕
              </button>
            </div>
            <ul className="lista-paraderos">
              {formData.ida.map(id => (
                <li key={id}>
                  {paraderos.find(p => p.id.toString() === id)?.nombre}
                  <span className="paradero-remove" onClick={() => quitarParadero('ida', id)}>
                    ✖
                  </span>
                </li>
              ))}
            </ul>

            <label>Puntos de Retorno</label>
            <div className="selector-paradero">
              <select value={retornoSeleccionado} onChange={e => setRetornoSeleccionado(e.target.value)}>
                <option value="">-- Selecciona paradero --</option>
                {paraderos.map(p => (
                  <option key={p.id} value={p.id}>
                    {p.nombre}
                  </option>
                ))}
              </select>
              <button type="button" onClick={() => agregarParadero('retorno')}>
                ➕
              </button>
            </div>
            <ul className="lista-paraderos">
              {formData.retorno.map(id => (
                <li key={id}>
                  {paraderos.find(p => p.id.toString() === id)?.nombre}
                  <span className="paradero-remove" onClick={() => quitarParadero('retorno', id)}>
                    ✖
                  </span>
                </li>
              ))}
            </ul>

            <div className="form-actions">
              <button type="button" className="cancel-btn" onClick={() => setEditRuta(null)}>
                Cancelar
              </button>
              <button type="submit" className="save-btn">
                Guardar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default ListarR
