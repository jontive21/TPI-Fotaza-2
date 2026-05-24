const express = require('express');
const router = express.Router();
const fotazaController = require('../controllers/fotazaController');

router.get('/', fotazaController.listar);

module.exports = router;
