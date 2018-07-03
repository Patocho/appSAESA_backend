'use strict';
module.exports = (sequelize, DataTypes) => {
  var Coronado = sequelize.define('Coronado', {
    ejemplo: DataTypes.INTEGER
  }, {});
  Coronado.associate = function(models) {
    // associations can be defined here
  };
  return Coronado;
};