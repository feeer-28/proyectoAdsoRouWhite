const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/verificarAdmin'); 
// Registro público para usuario (landing page)
router.post('/register/usuario', (req, res) =>
  AuthController.registerWithRole(req, res, 'usuario')
);

// Registro solo para admin (protegido con token y rol)
router.post('/register/admin', authMiddleware, verificarAdmin, (req, res) =>
  AuthController.registerByAdmin(req, res)
);

// Login general (todos los roles)
router.post('/login', AuthController.login);

// Ruta protegida (solo admin como ejemplo)
router.get('/admin/dashboard', authMiddleware, verificarAdmin, (req, res) => {
  res.json({
    mensaje: 'Bienvenido al panel del administrador',
    usuario: req.usuario // extraído del token
  });
});

module.exports = router;
