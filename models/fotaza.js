'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fotaza extends Model {
    static associate(models) {
      // Una fotaza tiene muchos comentarios
      Fotaza.hasMany(models.Comentario, { foreignKey: 'fotazaId', as: 'comentarios' });
    }
  }
  Fotaza.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    url_imagen: DataTypes.STRING,
    etiquetas: DataTypes.STRING,
    votos: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Fotaza',
  });
  return Fotaza;
};