const authService = require('../services/registerUsersService');

// Ruta pública para registrar el primer administrador
exports.registerAdmin = async (req, res) => {
  try {
    const mensaje = await authService.registrarUsuario(req.body, 'administrador');
    res.status(201).json({ mensaje });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Ruta protegida para que el admin cree conductores o despachadores
exports.registerByAdmin = async (req, res) => {
  try {
    const { rol } = req.body;

    if (!rol || !['conductor', 'despachador'].includes(rol)) {
      return res.status(400).json({
        error: 'Rol inválido. Solo se puede registrar conductor o despachador.'
      });
    }

    const mensaje = await authService.registrarUsuario(req.body, rol);
    res.status(201).json({ mensaje });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
