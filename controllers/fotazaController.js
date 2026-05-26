const { Op } = require('sequelize');
const { Fotaza } = require('../models');

const fotazaController = {
    // Método para listar todas las fotos (alias de index)
    listar: async (req, res) => {
        try {
            const fotos = await Fotaza.findAll({
                include: 'comentarios'
            });
            res.render('listaFotazas', { fotos }); // Esto renderizará una vista en Pug
        } catch (error) {
            res.status(500).send("Error al obtener las fotos");
        }
    },

    // Método para listar y buscar (Modificado para incluir comentarios)
    index: async (req, res) => {
        try {
            const { q } = req.query;
            let fotos;

            if (q) {
                fotos = await Fotaza.findAll({
                    where: {
                        [Op.or]: [
                            { titulo: { [Op.like]: `%${q}%` } },
                            { etiquetas: { [Op.like]: `%${q}%` } }
                        ]
                    },
                    include: 'comentarios' // ¡AGREGAMOS ESTO!
                });
            } else {
                fotos = await Fotaza.findAll({
                    include: 'comentarios' // ¡AGREGAMOS ESTO!
                });
            }

            res.render('listaFotazas', { fotos: fotos, busqueda: q || '' });
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al procesar el listado o la búsqueda");
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
    },

    // Método para eliminar una foto
    delete: async (req, res) => {
        try {
            await Fotaza.destroy({
                where: { id: req.params.id }
            });
            res.redirect('/fotazas');
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al eliminar la foto");
        }
    },

    // Muestra el formulario con los datos cargados
    editForm: async (req, res) => {
        try {
            const { id } = req.params;
            const foto = await Fotaza.findByPk(id);
            res.render('editarFotaza', { foto: foto });
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al buscar la fotaza");
        }
    },

    // Guarda los cambios modificados en MySQL
    update: async (req, res) => {
        try {
            const { id } = req.params;
            await Fotaza.update(req.body, {
                where: { id: id }
            });
            res.redirect('/fotazas');
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al actualizar la fotaza");
        }
    },

    // Método rústico para sumar un voto a la fotaza
    votar: async (req, res) => {
        try {
            const { id } = req.params;
            const foto = await Fotaza.findByPk(id); // Buscamos la foto por ID
            
            if (foto) {
                foto.votos = (foto.votos || 0) + 1; // Le sumamos 1 al contador
                await foto.save(); // Guardamos el cambio en MySQL
            }
            
            res.redirect('/fotazas'); // Volvemos a la lista para ver el cambio
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al procesar el voto");
        }
    }
};

module.exports = fotazaController;
