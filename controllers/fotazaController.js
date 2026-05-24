const { Fotaza } = require('../models');

const fotazaController = {
    // Método para listar todas las fotos (alias de index)
    listar: async (req, res) => {
        try {
            const fotos = await Fotaza.findAll();
            res.render('listaFotazas', { fotos }); // Esto renderizará una vista en Pug
        } catch (error) {
            res.status(500).send("Error al obtener las fotos");
        }
    },

    // Método para listar (utilizado por las rutas)
    index: async (req, res) => {
        try {
            const fotos = await Fotaza.findAll();
            res.render('listaFotazas', { fotos: fotos });
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al obtener las fotos de la base de datos");
        }
    },

    // Método para crear una nueva foto
    create: async (req, res) => {
        try {
            await Fotaza.create(req.body);
            res.redirect('/fotazas');
        } catch (error) {
            res.status(500).send("Error al guardar la foto");
        }
    }
};

module.exports = fotazaController;
