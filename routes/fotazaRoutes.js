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

// Ruta para eliminar una fotaza
router.post('/delete/:id', fotazaController.delete);

// Rutas para Editar
router.get('/edit/:id', fotazaController.editForm);
router.post('/edit/:id', fotazaController.update);

module.exports = router;
