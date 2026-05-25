const express = require('express');
const router = express.Router();
const fotazaController = require('../controllers/fotazaController');

// Ruta para ver el listado
router.get('/', fotazaController.index);
router.get('/create', (req, res) => {
    res.render('nuevaFotaza');
});
// Ruta para guardar una nueva (será un POST desde formulario)
router.post('/create', fotazaController.create);

module.exports = router;
