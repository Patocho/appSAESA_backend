'use strict';
module.exports = (sequelize, DataTypes) => {
  var Img_term = sequelize.define('Img_term', {
    nombre: DataTypes.STRING,
    recurso: DataTypes.TEXT('long'),
    tipo: DataTypes.STRING,
    situacion: DataTypes.STRING
  }, {paranoid:true});
  Img_term.associate = function(models) {
    Img_term.belongsTo(models.Operacion);
    Img_term.belongsTo(models.Componentes);
  };
  return Img_term;
};