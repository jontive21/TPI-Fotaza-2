### `package.json`
```json
{
  "name": "tpi-fotaza-2",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "dotenv": "^17.4.2",
    "express": "^5.2.1",
    "mysql2": "^3.22.3",
    "pug": "^3.0.4",
    "sequelize": "^6.37.8",
    "sequelize-cli": "^6.6.5"
  }
}
```

### `app.js`
```javascript
const express = require('express');
const path = require('path');

const app = express();

// View engine (si usas Pug en tu proyecto)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Servidor de archivos estáticos (para CSS, imágenes, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const fotazaRoutes = require('./routes/fotazaRoutes');
app.use('/fotazas', fotazaRoutes);

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
```

### `config/config.json`
```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "fotaza_db",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "fotaza_db_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "fotaza_db_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

### `models/fotaza.js`
```javascript
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fotaza extends Model {
    
    static associate(models) {
      
    }
  }
  Fotaza.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    url_imagen: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fotaza',
  });
  return Fotaza;
};
```

### `controllers/fotazaController.js`
```javascript
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
```

### `routes/fotazaRoutes.js`
```javascript
const express = require('express');
const router = express.Router();
const fotazaController = require('../controllers/fotazaController');

// Ruta para ver el listado
router.get('/', fotazaController.index);

// Ruta para guardar una nueva (será un POST desde tu formulario)
router.post('/create', fotazaController.create);

module.exports = router;
```

### `views/listaFotazas.pug`
```pug
h1 Listado de Fotazas
if fotos.length > 0
  ul
    each foto in fotos
      li= foto.titulo
else
  p No hay fotos cargadas todavía.
```

### `migrations/20260524130846-create-fotaza.js`
```javascript
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Fotazas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      descripcion: {
        type: Sequelize.STRING
      },
      url_imagen: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Fotazas');
  }
};
```