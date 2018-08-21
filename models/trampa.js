'use strict';
module.exports = (sequelize, DataTypes) => {
  var Trampa = sequelize.define('Trampa', {
    codigo_trampa: DataTypes.STRING,
    tipo:DataTypes.STRING
  }, {paranoid:true});
  Trampa.associate = function(models) {
    Trampa.belongsTo(models.Subestacion);
    Trampa.hasMany(models.Registro_estado);
  };

  Trampa.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Trampa;
};