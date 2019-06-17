'use strict';

const bcrypt 			= require('bcrypt');//para encriptar algo, en caso de contraseña
const bcrypt_p 			= require('bcrypt-promise');//promesas para encriptacion
const jwt           	= require('jsonwebtoken');//manejo de token

 const Rols          	= require('../models').Rols;

module.exports = (sequelize, DataTypes) => {
  	var User = sequelize.define('User', {
    	email    : {type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: {msg: "Email invalid."} }},
    	password : {type: DataTypes.STRING, allowNull: false, unique: false},
    	nombre: {type: DataTypes.STRING, allowNull: false, unique: false},
  	},{paranoid:true});

  	User.associate = function(models){
  		User.belongsToMany(models.Rol,{through:'UserRols'});
  		User.hasMany(models.Operacion);
  	};

	User.beforeSave(async (user, options) => {
	    let err;
	    if (user.changed('password')){
	        let salt, hash
	        [err, salt] = await to(bcrypt.genSalt(10));
	        if(err) TE(err.message, true);

	        [err, hash] = await to(bcrypt.hash(user.password, salt));
	        if(err) TE(err.message, true);

	        user.password = hash;
	    }
	});

	User.prototype.comparePassword = async function (pw) {
	    let err, pass
	    if(!this.password) TE('password not set');

	    [err, pass] = await to(bcrypt_p.compare(pw, this.password));
	    if(err) TE(err);

	    if(!pass) TE('Contraseña Incorrecta');

	    return this;
	};

	User.prototype.getJWT = function () {
	    let expiration_time = parseInt(CONFIG.jwt_expiration);
	    return "Bearer "+jwt.sign({user_id:this.id}, CONFIG.jwt_encryption, {expiresIn: expiration_time});
	};

	User.prototype.toWeb = function (pw) {
		//let id = this.id;
		//let mail = this.email;
		//let rol = this.Rols[0].descripcion;
	    let json = this.toJSON();
	    /*let rols = [];
	    for (let i in this.Rols) {
        let rol = Rols[i];
        let trampas_info = trampa.toWeb();

        trampas_json.push(trampas_info);
    }*/
	    return json;
	    //return {id,mail,rol};
	};

  	return User;
};