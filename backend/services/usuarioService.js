const { Usuario } = require('../models');

class UsuarioService {
  async crearUsuario(datosUsuario) {
    try {
      const nuevoUsuario = await Usuario.create(datosUsuario);
      return nuevoUsuario;
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  async obtenerUsuarioPorId(id) {
    try {
      const usuario = await Usuario.findByPk(id);
      return usuario;
    } catch (error) {
      throw new Error(`Error al buscar el usuario por ID: ${error.message}`);
    }
  }

  async obtenerUsuarioPorCorreo(correo) {
    try {
      const usuario = await Usuario.findOne({ where: { correo } });
      return usuario;
    } catch (error) {
      throw new Error(`Error al buscar el usuario por correo: ${error.message}`);
    }
  }

  async listarUsuarios() {
    try {
      const usuarios = await Usuario.findAll();
      return usuarios;
    } catch (error) {
      throw new Error(`Error al listar usuarios: ${error.message}`);
    }
  }

  async actualizarUsuario(id, nuevosDatos) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) throw new Error('Usuario no encontrado');

      await usuario.update(nuevosDatos);
      return usuario;
    } catch (error) {
      throw new Error(`Error al actualizar usuario: ${error.message}`);
    }
  }

  async eliminarUsuario(id) {
    try {
      const usuario = await Usuario.findByPk(id);
      if (!usuario) throw new Error('Usuario no encontrado');

      await usuario.destroy();
      return { mensaje: 'Usuario eliminado correctamente' };
    } catch (error) {
      throw new Error(`Error al eliminar usuario: ${error.message}`);
    }
  }
}

module.exports = new UsuarioService();
