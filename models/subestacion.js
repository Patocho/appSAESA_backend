'use strict';
module.exports = (sequelize, DataTypes) => {
  var Subestacion = sequelize.define('Subestacion', {
    cod_se: DataTypes.STRING,
    nombre_se: DataTypes.STRING,
    lat_se: DataTypes.FLOAT,
    long_se: DataTypes.FLOAT
  }, {});
  Subestacion.associate = function(models) {
    Subestacion.hasMany(models.Ot);
    Subestacion.hasMany(models.Trampa);
    Subestacion.hasMany(models.Equipo);
  };

  Subestacion.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Subestacion;
};