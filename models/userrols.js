'use strict';
module.exports = (sequelize, DataTypes) => {
  var UserRols = sequelize.define('UserRols', {}, {});
  UserRols.associate = function(models) {
    // associations can be defined here
  };
  return UserRols;
};