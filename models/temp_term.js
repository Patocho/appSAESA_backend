'use strict';
module.exports = (sequelize, DataTypes) => {
  var Temp_term = sequelize.define('Temp_term', {
    x1: DataTypes.INTEGER
  }, {});
  Temp_term.associate = function(models) {
    // associations can be defined here
  };
  return Temp_term;
};