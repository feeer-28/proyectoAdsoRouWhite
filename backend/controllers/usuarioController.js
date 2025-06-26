const usuarioService = require('../services/usuarioService');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class UsuarioController {
  async crearUsuario(req, res) {
    try {
      const datos = req.body;
      const usuario = await usuarioService.crearUsuario(datos);
      res.status(201).json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async obtenerUsuarioPorId(req, res) {
    try {
      const id = req.params.id;
      const usuario = await usuarioService.obtenerUsuarioPorId(id);
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async listarUsuarios(_req, res) {
    try {
      const usuarios = await usuarioService.listarUsuarios();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async actualizarUsuario(req, res) {
    try {
      const id = req.params.id;
      const nuevosDatos = req.body;
      const usuarioActualizado = await usuarioService.actualizarUsuario(id, nuevosDatos);
      res.json(usuarioActualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async eliminarUsuario(req, res) {
    try {
      const id = req.params.id;
      const resultado = await usuarioService.eliminarUsuario(id);
      res.json(resultado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { correo, contraseña } = req.body;
      const usuario = await usuarioService.obtenerUsuarioPorCorreo(correo);

      if (!usuario) {
        return res.status(401).json({ mensaje: 'Credenciales inválidas' });
      }

      const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
      if (!contraseñaValida) {
        return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
      }
      const token = jwt.sign(
        { id: usuario.id, rol: usuario.rol }, // payload
        process.env.JWT_SECRET || 'secreto123', 
        { expiresIn: '24h' } ); 
      res.json({ mensaje: 'Inicio de sesión exitoso', usuario, token });
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UsuarioController();
