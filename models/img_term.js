'use strict';
module.exports = (sequelize, DataTypes) => {
  var Img_term = sequelize.define('Img_term', {
    nombre: DataTypes.STRING,
    recurso: DataTypes.TEXT('long'),
    tipo: DataTypes.STRING
  }, {paranoid:true});
  Img_term.associate = function(models) {
    Img_tareas.belongsTo(models.Operacion);
  };
  return Img_term;
};