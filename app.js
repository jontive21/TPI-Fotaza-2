require('dotenv').config();
const express = require('express');
const path = require('path');
const { Sequelize } = require('sequelize');
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

// =====================================================
// NUEVO: Sincronizar base de datos antes de iniciar
// =====================================================
const config = require('./config/config.js');
const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    port: dbConfig.port || 3306,
    dialectOptions: dbConfig.dialectOptions || {}
  }
);

// Iniciar servidor solo después de sincronizar la BD
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida correctamente.');
    return sequelize.sync(); // Esto crea las tablas si no existen
  })
  .then(() => {
    console.log('Base de datos sincronizada.');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('Error al conectar con la base de datos:', err);
    process.exit(1);
  });

module.exports = app;
