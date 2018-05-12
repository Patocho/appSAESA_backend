'use strict';
module.exports = (sequelize, DataTypes) => {
  var Trampa = sequelize.define('Trampa', {
    codigo_trampa: DataTypes.STRING,
    tipo:DataTypes.STRING
  }, {});
  Trampa.associate = function(models) {
    Trampa.belongsTo(models.Subestacion);
  };

  Trampa.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Trampa;
};