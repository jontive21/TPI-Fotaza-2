const express = require('express');
const router = express.Router();
const fotazaController = require('../controllers/fotazaController');

// Ruta para ver el listado
router.get('/', fotazaController.index);

// Ruta para guardar una nueva (será un POST desde tu formulario)
router.post('/create', fotazaController.create);

module.exports = router;
