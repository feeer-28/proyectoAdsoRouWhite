// controllers/authController.js

const LoginService = require('../services/loginUsersService');
const RegisterService = require('../services/registerUsersService');

exports.registerWithRole = async (req, res, rol) => {
  try {
    const resultado = await RegisterService.registrarUsuario(req.body, rol);
    res.status(201).json({ mensaje: resultado });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

exports.loginConRol = async (req, res, rol) => {
  try {
    const resultado = await LoginService.loginConRol(req.body, rol);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(401).json({ mensaje: error.message });
  }
};
