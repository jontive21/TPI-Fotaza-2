const express = require('express');
const path = require('path');

const app = express();

// View engine (si usas Pug en tu proyecto)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Rutas
const fotazaRoutes = require('./routes/fotazaRoutes');
app.use('/fotazas', fotazaRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
