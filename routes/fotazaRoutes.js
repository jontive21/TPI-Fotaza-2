const express = require('express');
const router = express.Router();
const fotazaController = require('../controllers/fotazaController');
const comentarioController = require('../controllers/comentarioController');

// Ruta para ver el listado
router.get('/', fotazaController.index);
router.get('/create', (req, res) => {
    res.render('nuevaFotaza');
});
// Ruta para guardar una nueva (será un POST desde formulario)
router.post('/create', fotazaController.create);

// Ruta para eliminar una fotaza
router.post('/delete/:id', fotazaController.delete);

// Ruta para votar una fotaza
router.post('/votar/:id', fotazaController.votar);
router.post('/denunciar/:id', fotazaController.denunciar);

// Rutas para Editar
router.get('/edit/:id', fotazaController.editForm);
router.post('/edit/:id', fotazaController.update);

// Ruta para agregar comentarios
router.post('/comment', comentarioController.create);

// Ruta rústica para simular que iniciamos sesión
router.get('/login-simulado', (req, res) => {
    global.usuarioLogueado = true;
    res.redirect('/fotazas');
});

// Ruta rústica para simular que cerramos sesión (volver a anónimo)
router.get('/logout-simulado', (req, res) => {
    global.usuarioLogueado = false;
    res.redirect('/fotazas');
});

module.exports = router;
