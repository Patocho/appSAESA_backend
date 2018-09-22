'use strict';
module.exports = (sequelize, DataTypes) => {
  var Alerta = sequelize.define('Alerta', {
    alerta: DataTypes.STRING,
    hanta: DataTypes.STRING
  }, {paranoid:true});
  Alerta.associate = function(models) {
    // associations can be defined here
  };
  return Alerta;
};