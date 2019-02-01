'use strict';
module.exports = (sequelize, DataTypes) => {
  var Alerta = sequelize.define('Alerta', {
    alerta: DataTypes.STRING,
    hanta: DataTypes.STRING,
    estado: DataTypes.STRING
  }, {paranoid:true});
  Alerta.associate = function(models) {
    Alerta.belongsTo(models.Operacion);
  };
  return Alerta;
};