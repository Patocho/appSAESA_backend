'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserRols = sequelize.define('UserRols', {}, {paranoid:true});
  UserRols.associate = function(models) {
    // associations can be defined here
  };
  return UserRols;
};