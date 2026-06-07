'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comentario extends Model {
    static associate(models) {
      // Un comentario pertenece a una Fotaza
      Comentario.belongsTo(models.Fotaza, { foreignKey: 'fotazaId', as: 'foto' });
    }
  }
  Comentario.init({
    contenido: DataTypes.STRING,
    fotazaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comentario',tableName: 'comentarios',    // ← AGREGAR
    freezeTableName: true,
  });
  return Comentario;
};