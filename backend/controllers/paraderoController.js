const paraderoService = require('../services/paraderoService');

// Controlador para crear paradero
exports.crearParadero = async (req, res) => {
  try {
    const paradero = await paraderoService.crearParadero(req.body);
    res.status(201).json({ mensaje: 'Paradero creado exitosamente.', paradero });
  } catch (error) {
    if (error.errores && Array.isArray(error.errores)) {
      return res.status(400).json({ errores: error.errores });
    }
    res.status(500).json({ mensaje: error.message || 'Error al crear paradero.' });
  }
};



// Controlador para listar paraderos
exports.listarParaderos = async (req, res) => {
  try {
    const lista = await paraderoService.listarParaderos();
    res.json(lista);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener paraderos.', error: error.message });
  }
};
