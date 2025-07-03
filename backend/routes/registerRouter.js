const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/verificarAdmin');

// Ruta pública para registrar el primer administrador
router.post('/admin', AuthController.registerAdmin);

// Ruta pública para registro de usuario normal
router.post('/register/usuario', (req, res) =>
  AuthController.registerWithRole(req, res, 'usuario')
);

// Ruta protegida para que el admin registre conductores o despachadores
router.post('/register/gestion', authMiddleware, verificarAdmin, (req, res) =>
  AuthController.registerByAdmin(req, res)
);

module.exports = router;
