const { Fotaza } = require('../models');

const fotazaController = {
    listar: async (req, res) => {
        try {
            const fotos = await Fotaza.findAll();
            res.render('listaFotazas', { fotos }); // Esto renderizará una vista en Pug
        } catch (error) {
            res.status(500).send("Error al obtener las fotos");
        }
    }
};

module.exports = fotazaController;
