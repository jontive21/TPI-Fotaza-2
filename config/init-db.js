const db = require('../models');

async function initDB() {
    try {
        console.log('Iniciando la creación de tablas...');
        // sync() crea las tablas de la base de datos basándose en los modelos
        await db.sequelize.sync(); 
        console.log('Tablas creadas con éxito.');
        process.exit(0);
    } catch (error) {
        console.error('Error al crear las tablas:', error);
        process.exit(1);
    }
}

initDB();
