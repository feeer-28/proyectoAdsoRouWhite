const RutaService = require('../services/rutaService');

const RutaController = {
  async listarRutas(req, res) {
    try {
      const rutas = await RutaService.obtenerRutasActivas();
      res.status(200).json(rutas);
    } catch (error) {
      console.error('Error en RutaController:', error.message);
      res.status(500).json({ mensaje: 'Error al obtener las rutas' });
    }
  },

  async buscarRutaPorId(req, res) {
    const { id } = req.params;
    try {
      const ruta = await RutaService.getRutaById(id);
      res.status(200).json(ruta);
    } catch (error) {
      console.error('Error en RutaController:', error.message);
      res.status(404).json({ mensaje: 'Ruta no encontrada' });
    }
  },

  async agregarRutaAFavoritos(req, res) {
    const { rutaId } = req.body;
    const usuarioId = req.usuario.id; 
    try {
      const resultado = await RutaService.agregarRutaFavoritos(rutaId, usuarioId);
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Error en RutaController:', error.message);
      res.status(500).json({ mensaje: 'Error al agregar la ruta a favoritos' });
    }
  },

  async eliminarRutaFavoritos(req, res) {
    const { rutaId } = req.body;
    const usuarioId = req.usuario.id; 
    try {
      const resultado = await RutaService.eliminarRutaFavoritos(rutaId, usuarioId);
      res.status(200).json(resultado);
    } catch (error) {
      console.error('Error en RutaController:', error.message);
      res.status(500).json({ mensaje: 'Error al eliminar la ruta de favoritos' });
    }
  }

};

module.exports = RutaController;
