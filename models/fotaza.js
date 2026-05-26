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
    ,etiquetas: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Fotaza',
  });
  return Fotaza;
};