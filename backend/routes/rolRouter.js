const express = require('express');
const router = express.Router();
const rolController = require('../controllers/rolController');

router.post('/crear', rolController.crearRol);
router.get('/listar', rolController.listarRoles);

module.exports = router;
