'use strict';
module.exports = (sequelize, DataTypes) => {
  var Otra_tarea = sequelize.define('Otra_tarea', {
    desmalezado: DataTypes.STRING,
    corte_pasto_: DataTypes.STRING,
    nebulizacion: DataTypes.STRING
  }, {paranoid:true});
  Otra_tarea.associate = function(models) {
    Otra_tarea.belongsTo(models.Operacion);
  };
  Otra_tarea.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Otra_tarea;
};