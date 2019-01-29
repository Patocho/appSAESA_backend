'use strict';
module.exports = (sequelize, DataTypes) => {
  var Temp_term = sequelize.define('Temp_term', {
    x1: DataTypes.INTEGER,
    y1: DataTypes.INTEGER,
    x2: DataTypes.INTEGER,
    y2: DataTypes.INTEGER,
    x3: DataTypes.INTEGER,
    y3: DataTypes.INTEGER,
    tem1: DataTypes.FLOAT,
    tem2: DataTypes.FLOAT,
    tem3: DataTypes.FLOAT,
    delta12: DataTypes.FLOAT,
    delta23: DataTypes.FLOAT,
    delta31: DataTypes.FLOAT
  }, {});
  Temp_term.associate = function(models) {
    // associations can be defined here
  };
  return Temp_term;
};