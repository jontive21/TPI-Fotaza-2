require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

// View engine (Pug)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Variable global para simular login
global.usuarioLogueado = false;

app.use((req, res, next) => {
  res.locals.usuarioLogueado = global.usuarioLogueado;
  next();
});

// Rutas
app.get('/', (req, res) => {
  res.redirect('/fotazas');
});

const fotazaRoutes = require('./routes/fotazaRoutes');
app.use('/fotazas', fotazaRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

// =====================================================
// USAR LOS MODELOS (que ya tienen la conexión SSL de Aiven)
// =====================================================
const db = require('./models');
const sequelize = db.sequelize;

// Iniciar servidor SOLO después de conectar y crear tablas
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a Aiven establecida.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Tablas sincronizadas.');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ Error al conectar:', err.message);
    process.exit(1);
  });

module.exports = app;