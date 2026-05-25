const { Fotaza } = require('../models');

const fotazaController = {
    // Método para listar todas las fotos
    index: async (req, res) => {
        try {
            const fotos = await Fotaza.findAll();
            // buscará una vista llamada 'listaFotazas.pug'
            res.render('listaFotazas', { fotos: fotos });
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al obtener las fotos de la base de datos");
        }
    },

    // Método para crear una nueva foto (luego en el formulario)
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
