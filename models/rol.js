'use strict';
module.exports = (sequelize, DataTypes) => {
  var Rol = sequelize.define('Rol', {
    descripcion: DataTypes.STRING
  }, {});
  Rol.associate = function(models) {
    Rol.belongsToMany(models.User,{foreignKey:'rol_id',through:{model:models.UserRol}});
  };

    Rol.prototype.toWeb = function (pw) {
    let json = this.toJSON();
    return json;
  };
  return Rol;
};