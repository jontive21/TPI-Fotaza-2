'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fotaza extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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