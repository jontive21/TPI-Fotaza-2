// controllers/comentarioController.js
const { Comentario } = require('../models');

const comentarioController = {
    // Método para procesar el formulario y crear un comentario
    create: async (req, res) => {
        try {
            const { contenido, fotazaId } = req.body;
            
            if (!contenido || !contenido.trim()) {
                return res.status(400).send("El comentario no puede estar vacío");
            }
            
            if (!fotazaId) {
                return res.status(400).send("ID de fotaza requerido");
            }
            
            // Guardamos el comentario en MySQL
            await Comentario.create({
                contenido: contenido.trim(),
                fotazaId: fotazaId
            });
            
            // Redirigimos de vuelta a la página principal de fotazas
            res.redirect('/fotazas');
        } catch (error) {
            console.error(error);
            res.status(500).send("Error al publicar el comentario");
        }
    }
};

module.exports = comentarioController;