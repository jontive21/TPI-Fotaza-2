'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fotaza extends Model {
    static associate(models) {
      Fotaza.hasMany(models.Comentario, { foreignKey: 'fotazaId', as: 'comentarios' });
    }
  }
  Fotaza.init({
    titulo: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    url_imagen: DataTypes.STRING,
    etiquetas: DataTypes.STRING,
    votos: DataTypes.INTEGER,
    denuncias: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Fotaza',
    tableName: 'fotazas',
    freezeTableName: true,
    timestamps: true
  });
  return Fotaza;
};