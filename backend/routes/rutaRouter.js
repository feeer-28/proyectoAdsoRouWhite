const express = require('express');
const router = express.Router();
const RutaController = require('../controllers/rutasController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/listar',RutaController.listarRutas);
router.get('/:id', RutaController.buscarRutaPorId);
router.post('/favoritos', RutaController.agregarRutaAFavoritos);
router.delete('/favoritos',  RutaController.eliminarRutaFavoritos);

module.exports = router;
