'use strict';
module.exports = (sequelize, DataTypes) => {
  var Equipo = sequelize.define('Equipo', {
    cod_eq: DataTypes.STRING,
    nombre_eq: DataTypes.STRING,
    ubic_tec_eq: DataTypes.STRING
  }, {});
  Equipo.associate = function(models) {
  	Equipo.belongsTo(models.Subestacion);
  	Equipo.hasMany(models.Componente);
  };
  Equipo.prototype.toWeb = function (pw) {
  	let json = this.toJSON();
  	return json;
  };
  return Equipo;
};