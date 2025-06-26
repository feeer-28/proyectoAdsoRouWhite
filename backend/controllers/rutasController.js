const rutaService = require('../services/rutaService');

exports.crearRuta = async (req, res) => {
  try {
    const nuevaRuta = await rutaService.crearRuta(req.body);
    res.status(201).json(nuevaRuta);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la ruta.' });
  }
};
exports.listarRutas = async (req, res) => {
  try {
    const rutas = await rutaService.listarRutas();
    res.status(200).json(rutas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las rutas.' });
  }
};