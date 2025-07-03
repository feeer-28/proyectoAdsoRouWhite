const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/loginController');
const authMiddleware = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/verificarAdmin');

// Login general
router.post('/login', AuthController.login);

// Ruta protegida de ejemplo (solo admin)
router.get('/admin/dashboard', authMiddleware, verificarAdmin, (req, res) => {
  res.json({
    mensaje: 'Bienvenido al panel del administrador',
    usuario: req.usuario
  });
});

module.exports = router;
