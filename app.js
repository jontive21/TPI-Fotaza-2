require('dotenv').config();
const express = require('express');
const path = require('path');
const { Sequelize } = require('sequelize');
const app = express();

// View engine
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
const fotazaRoutes = require('./routes/fotazaRoutes');
app.use('/fotazas', fotazaRoutes);

// Puerto
const PORT = process.env.PORT || 3000;

// =====================================================
// CONEXIÓN A LA BASE DE DATOS CON SSL
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
    port: dbConfig.port || 3306,
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions || {},
    logging: false
  }
);

// Iniciar servidor solo después de sincronizar la BD
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a la base de datos establecida.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('✅ Tablas sincronizadas.');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ Error al conectar con la base de datos:', err);
    process.exit(1);
  });

module.exports = app;
