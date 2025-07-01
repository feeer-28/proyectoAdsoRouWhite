const LoginService = require('../services/loginUsersService');

exports.login = async (req, res) => {
  try {
    const resultado = await LoginService.login(req.body);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
