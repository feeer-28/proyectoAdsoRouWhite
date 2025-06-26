const { Ruta, Empresa } = require('../models');

const RutaService = {

  async obtenerRutasActivas() {
    try {
      const empresas = await Empresa.findAll({
        attributes: ['id', 'nombre'],
        include: [
          {
            model: Ruta,
            attributes: ['id', 'nombre'],
            where: { vigente: true },
            required: true,
          },
        ],
      });

      return empresas;
    } catch (error) {
      throw new Error('Error al obtener las rutas agrupadas por empresa: ' + error.message);
    }
  },


  async getRutaById(id) {
    try {
      const ruta = await Ruta.findOne({
        where: { id: id },
        include: [
          {
            model: Empresa,
            attributes: ['nombre', 'direccion', 'telefono'],
          },
        ],
        attributes: ['id', 'nombre', 'descripcion', 'hora_inicio', 'hora_fin']
      });

      if (!ruta) {
        throw new Error('Ruta no encontrada');
      }

      return ruta;
    } catch (error) {
      throw new Error('Error al obtener la ruta: ' + error.message);
    }
  },

  async agregarRutaFavoritos(rutaId, usuarioId) {
    try {
      const ruta = await Ruta.findByPk(rutaId);
      if (!ruta) {
        throw new Error('Ruta no encontrada');
      }

      // logica para agregar la ruta a favoritos del usuario

      return { message: 'Ruta agregada a favoritos' };
    } catch (error) {
      throw new Error('Error al agregar la ruta a favoritos: ' + error.message);
    }
  },

  async eliminarRutaFavoritos(rutaId, usuarioId) {
    try {
      const ruta = await Ruta.findByPk(rutaId);
      if (!ruta) {
        throw new Error('Ruta no encontrada');
      }

      // logica para eliminar la ruta de favoritos del usuario

      return { message: 'Ruta eliminada de favoritos' };
    } catch (error) {
      throw new Error('Error al eliminar la ruta de favoritos: ' + error.message);
    }
  }
};

module.exports = RutaService;
/*/require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  },
  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
};/*/