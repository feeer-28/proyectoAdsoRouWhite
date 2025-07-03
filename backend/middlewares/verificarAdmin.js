const verificarAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.rol === 'administrador') {
    return next();
  }
  return res.status(403).json({ error: 'Acceso denegado: solo el administrador puede realizar esta acción' });
};

module.exports = verificarAdmin;
