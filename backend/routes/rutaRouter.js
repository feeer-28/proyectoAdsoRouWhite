const express = require('express');
const router = express.Router();
const rutasController = require('../controllers/rutasController');

router.post('/crear', rutasController.crearRuta);
router.get('/listar', rutasController.listarRutas);
router.get('/:id', rutasController.obtenerRutaPorId);
router.put('/:id', rutasController.actualizarRuta);
router.delete('/:id', rutasController.eliminarRuta);

module.exports = router;
