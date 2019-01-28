'use strict';
module.exports = (sequelize, DataTypes) => {
  var Img_term = sequelize.define('Img_term', {
    nombre: DataTypes.STRING,
    recurso: DataTypes.TEXT,
    tipo: DataTypes.STRING
  }, {});
  Img_term.associate = function(models) {
    // associations can be defined here
  };
  return Img_term;
};