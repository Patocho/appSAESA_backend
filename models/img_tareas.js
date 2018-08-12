'use strict';
module.exports = (sequelize, DataTypes) => {
  var Img_tareas = sequelize.define('Img_tareas', {
  	recurso: DataTypes.TEXT('long')
  }, {});
  Img_tareas.associate = function(models) {
    // associations can be defined here
  };
  return Img_tareas;
};