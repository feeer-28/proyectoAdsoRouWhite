const express = require('express');
const router = express.Router();
const rutasController = require('../controllers/rutasController');

router.post('/crear', rutasController.crearRuta);
router.get('/listar', rutasController.listarRutas);


module.exports = router;
