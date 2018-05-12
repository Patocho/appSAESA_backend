'use strict';
module.exports = (sequelize, DataTypes) => {
  var Operacion = sequelize.define('Operacion', {
    pt_operacion: DataTypes.INTEGER,
    fechahora_inicio: DataTypes.DATE,
    fechahora_fin: DataTypes.DATE
  }, {});
  Operacion.associate = function(models) {
    Operacion.belongsTo(models.User);
    Operacion.belongsTo(models.Ot);
    Operacion.hasOne(models.Otra_tarea);
    Operacion.hasMany(models.Registro_estado);
  };
    Operacion.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Operacion;
};