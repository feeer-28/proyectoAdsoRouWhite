const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');

router.post('/crear', empresaController.crearEmpresa);
router.get('/listar', empresaController.listarEmpresas);

module.exports = router;
