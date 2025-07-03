const express = require('express');
const router = express.Router();
const paraderoController = require('../controllers/paraderoController');

router.post('/', paraderoController.crearParadero);
router.get('/obtener', paraderoController.listarParaderos);
router.put('/:id', paraderoController.actualizarParadero);
router.delete('/:id', paraderoController.eliminarParadero);

module.exports = router;