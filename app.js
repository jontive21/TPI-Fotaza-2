require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();

// View engine (Pug en proyecto)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Servidor de archivos estáticos (para CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Variable rústica global para simular el estado del usuario
// true = usuario logueado / false = visitante anónimo
global.usuarioLogueado = false;

// Middleware simple para pasar este estado a todas las vistas de Pug
app.use((req, res, next) => {
    res.locals.usuarioLogueado = global.usuarioLogueado;
    next();
});

// Rutas
const fotazaRoutes = require('./routes/fotazaRoutes');
app.use('/fotazas', fotazaRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
