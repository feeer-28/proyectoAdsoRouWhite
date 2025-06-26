const express = require('express');
const router = express.Router();
const paraderoController = require('../controllers/paraderoController');

router.post('/crear', paraderoController.crearParadero);
router.get('/obtener', paraderoController.listarParaderos);

module.exports = router;