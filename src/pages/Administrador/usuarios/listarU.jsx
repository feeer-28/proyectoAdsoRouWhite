import React, { useEffect, useState } from "react";
import "../../../styles/admin/usuarios/listadoUsuarios.css";

export default function ListadoUsuarios() {
    const [usuarios, setUsuarios] = useState([]);
    const [rolFiltro, setRolFiltro] = useState("Todos");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [editando, setEditando] = useState(null);
    const [nuevoNombre, setNuevoNombre] = useState("");
    const [nuevoEmail, setNuevoEmail] = useState("");

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setUsuarios([
                { id: 1, nombre: "Juan Pérez", email: "juan@example.com", rol: "Admin", estado: "activo" },
                { id: 2, nombre: "Ana Gómez", email: "ana@example.com", rol: "Usuario", estado: "inactivo" },
                { id: 3, nombre: "Carlos Ruiz", email: "carlos@example.com", rol: "Usuario", estado: "activo" },
            ]);
            setLoading(false);
        }, 800);
    }, []);

    const eliminarUsuario = async (id) => {
        if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;
        try {
            await fetch(`http://localhost:3000/api/usuarios/${id}`, { method: "DELETE" });
            setUsuarios(usuarios.filter((u) => u.id !== id));
        } catch {
            alert("Error eliminando usuario.");
        }
    };

    const iniciarEdicion = (usuario) => {
        setEditando(usuario.id);
        setNuevoNombre(usuario.nombre);
        setNuevoEmail(usuario.email);
    };

    const guardarEdicion = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre: nuevoNombre, email: nuevoEmail }),
            });

            if (!res.ok) throw new Error("Error al actualizar usuario");

            const data = await res.json();
            setUsuarios(usuarios.map((u) => (u.id === id ? data.usuario : u)));
            setEditando(null);
        } catch {
            alert("Error guardando cambios.");
        }
    };

    const usuariosFiltrados =
        rolFiltro === "Todos" ? usuarios : usuarios.filter((u) => u.rol === rolFiltro);

    return (
        <div className="listado-container">
            <h2 className="listado-title">📋 Listado de Usuarios</h2>

            <div className="filtro-container">
                <label className="filtro-label">Filtrar por rol:</label>
                <select
                    value={rolFiltro}
                    onChange={(e) => setRolFiltro(e.target.value)}
                    className="filtro-select"
                >
                    <option value="Todos">Todos</option>
                    <option value="Admin">Admin</option>
                    <option value="Usuario">Usuario</option>
                </select>
            </div>

            {loading && <p>Cargando usuarios...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && usuariosFiltrados.length === 0 && <p>No hay usuarios con el rol seleccionado.</p>}

            {!loading && usuariosFiltrados.length > 0 && (
                <table className="tabla">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Rol</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuariosFiltrados.map((u) => (
                            <tr key={u.id}>
                                <td>
                                    {editando === u.id ? (
                                        <input
                                            type="text"
                                            value={nuevoNombre}
                                            onChange={(e) => setNuevoNombre(e.target.value)}
                                        />
                                    ) : (
                                        u.nombre
                                    )}
                                </td>
                                <td>
                                    {editando === u.id ? (
                                        <input
                                            type="email"
                                            value={nuevoEmail}
                                            onChange={(e) => setNuevoEmail(e.target.value)}
                                        />
                                    ) : (
                                        u.email
                                    )}
                                </td>
                                <td>{u.rol}</td>
                                <td>
                                    {u.estado === "activo" ? (
                                        <span className="estado-activo">✅ Activo</span>
                                    ) : (
                                        <span className="estado-inactivo">❌ Inactivo</span>
                                    )}
                                </td>
                                <td className="acciones">
                                    {editando === u.id ? (
                                        <>
                                            <button onClick={() => guardarEdicion(u.id)} className="icon-btn">
                                                💾 Guardar
                                            </button>
                                            <button onClick={() => setEditando(null)} className="icon-btn">
                                                ❌ Cancelar
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => iniciarEdicion(u)} className="icon-btn">
                                                ✏️
                                            </button>
                                            <button onClick={() => eliminarUsuario(u.id)} className="icon-btn">
                                                🗑️ 
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
