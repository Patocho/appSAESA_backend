'use strict';
module.exports = (sequelize, DataTypes) => {
  var Img_control = sequelize.define('Img_control', {
    recurso: DataTypes.TEXT
  }, {paranoid:true});
  Img_control.associate = function(models) {
    Img_control.belongsTo(models.Registro_estado);
  };
    Img_control.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Img_control;
};