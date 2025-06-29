const rutaService = require('../services/rutaService');

exports.crearRuta = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // DEBUG
    const nuevaRuta = await rutaService.crearRuta(req.body);
    res.status(201).json({ mensaje: 'Ruta creada exitosamente.', ruta: nuevaRuta });
  } catch (error) {
    if (error.errores) {
      res.status(400).json({ mensaje: 'Error al crear ruta.', errores: error.errores });
    } else {
      res.status(500).json({ mensaje: 'Error del servidor.', error: error.message });
    }
  }
};

exports.listarRutas = async (req, res) => {
  try {
    const rutas = await rutaService.listarRutas();
    res.json(rutas);
  } catch (error) {
    console.error(error); // 👈 agrega esto
    res.status(500).json({ mensaje: 'Error al listar rutas.', error: error.message });
  }
};

