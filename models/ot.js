'use strict';
module.exports = (sequelize, DataTypes) => {
  var Ot = sequelize.define('Ot', {
    numero_ot: DataTypes.INTEGER,
    fecha_ot: DataTypes.DATE,
    trabajo: DataTypes.STRING
  }, {paranoid:true});
  Ot.associate = function(models) {
    Ot.hasMany(models.Operacion);
    Ot.belongsTo(models.Subestacion);
  };
  Ot.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Ot;
};