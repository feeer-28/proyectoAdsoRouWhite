const LoginService = require('../services/loginUsersService');
const RegisterService = require('../services/registerUsersService');

exports.registerWithRole = async (req, res, rolFijo) => {
  try {
    const mensaje = await authService.registrarUsuario(req.body, rolFijo);
    res.status(201).json({ mensaje });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Registro realizado por el administrador (puede elegir conductor o despachador)
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

exports.login = async (req, res) => {
  try {
    const resultado = await LoginService.login(req.body);
    res.json(resultado);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

