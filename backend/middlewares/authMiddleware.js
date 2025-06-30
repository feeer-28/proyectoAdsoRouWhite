const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ mensaje: 'Acceso denegado. No se proporcionó token.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || 'secreto123');
    req.usuario = payload; // Lo pasamos al siguiente middleware/controlador
    next();
  } catch (error) {
    res.status(401).json({ mensaje: 'Token inválido o expirado' });
  }
};

module.exports = authMiddleware;
