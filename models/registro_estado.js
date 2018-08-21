'use strict';
module.exports = (sequelize, DataTypes) => {
  var Registro_estado = sequelize.define('Registro_estado', {
    cod_trampa: DataTypes.STRING,
    estado_registro: DataTypes.STRING,
    obs_registro: DataTypes.STRING
  }, {paranoid:true});
  Registro_estado.associate = function(models) {
    Registro_estado.belongsTo(models.Operacion);
    Registro_estado.belongsTo(models.Trampa);
    Registro_estado.hasMany(models.Img_control);
  };

    Registro_estado.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Registro_estado;
};