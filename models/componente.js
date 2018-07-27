'use strict';
module.exports = (sequelize, DataTypes) => {
  var Componente = sequelize.define('Componente', {
    cod_comp: DataTypes.STRING,
    nombre_comp: DataTypes.STRING,
    poloa_comp: DataTypes.STRING,
    polob_comp: DataTypes.STRING,
    poloc_comp: DataTypes.STRING
  }, {});
  Componente.associate = function(models) {
    Componente.belongsTo(models.Equipo);
  };
  Componente.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Componente;
};