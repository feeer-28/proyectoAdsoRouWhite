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
    console.error(error); 
    res.status(500).json({ mensaje: 'Error al listar rutas.', error: error.message });
  }
};

exports.obtenerRutaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const ruta = await rutaService.obtenerRutaPorId(id);
    if (!ruta) {
      return res.status(404).json({ mensaje: 'Ruta no encontrada.' });
    }
    res.json(ruta);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ mensaje: 'Error al obtener ruta.', error: error.message });
  }
};

exports.actualizarRuta = async (req, res) => {
  const { id } = req.params;
  try {
    const rutaActualizada = await rutaService.actualizarRuta(id, req.body);
    res.json({ mensaje: 'Ruta actualizada correctamente', ruta: rutaActualizada });
  } catch (error) {
    console.error(error); 
    res.status(400).json({ mensaje: error.message });
  }
};
exports.eliminarRuta = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await rutaService.eliminarRuta(id);
    res.json({ mensaje: resultado.mensaje });
  } catch (error) {
    console.error(error); 
    res.status(400).json({ mensaje: error.message });
  }
};