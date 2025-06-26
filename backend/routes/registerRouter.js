const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

// Registro por rol
router.post('/admin', (req, res) => AuthController.registerWithRole(req, res, 'administrador'));
router.post('/conductor', (req, res) => AuthController.registerWithRole(req, res, 'conductor'));
router.post('/despachador', (req, res) => AuthController.registerWithRole(req, res, 'despachador'));
router.post('/usuario', (req, res) => AuthController.registerWithRole(req, res, 'usuario'));

// Login por rol
router.post('/login/admin', (req, res) => AuthController.loginConRol(req, res, 'administrador'));
router.post('/login/conductor', (req, res) => AuthController.loginConRol(req, res, 'conductor'));
router.post('/login/despachador', (req, res) => AuthController.loginConRol(req, res, 'despachador'));
router.post('/login/usuario', (req, res) => AuthController.loginConRol(req, res, 'usuario'));

// Ruta protegida para el panel del administrador prueba
router.get('/admin/dashboard', authMiddleware, (req, res) => {
  res.json({
    mensaje: 'Bienvenido al panel del administrador',
    usuario: req.usuario // lo extrae del token decodificado
  });
});

module.exports = router;
