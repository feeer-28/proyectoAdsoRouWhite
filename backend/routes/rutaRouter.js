const express = require('express');
const router = express.Router();
const rutasController = require('../controllers/rutasController');

router.post('/', rutasController.crearRuta);
router.get('/', rutasController.listarRutas);


module.exports = router;
