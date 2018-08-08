const User = require('../models').User;
const Rol = require('../models').Rol;
const authService = require('./../services/AuthService');
const Roles = require('../models').UserRols;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    //console.log(body);
    if(!body.unique_key && !body.email){
        return ReE(res, 'Por favor, ingresa un email para registrar');
    } else if(!body.password){
        return ReE(res, 'Por favor, ingresa una contraseña para registrar');
    }else{
        let err, user;

        [err, user] = await to(authService.createUser(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Usuario creado satisfactoriamente', user:user.toWeb(), token:user.getJWT()}, 201);
    }
}

module.exports.create = create;

const login = async function(req, res){
    const body = req.body;
    let err, user, rol;

    [err, user] = await to(authService.authUser(req.body));
    if(err) return ReE(res, err, 422);
    [err, rol] = await to(Rol.findAll({
        include : [ {
            model: User,
            where: {
                id:user.id,
            },
        }]}));
    let roles_json = [];
    for (let i in rol) {
        //let roles = rol[i];
        roles_json.push({id:rol[i].id,descripcion:rol[i].descripcion});
    }
    let user1 ={id:user.id};

    if(err) TE(err.message);

    return ReS(res, {token:user.getJWT(), dato:user1, roles:roles_json});
}
module.exports.login = login;

const inspectores = async function(req, res){
    const body = req.body;
    let err, user;
    rol = req.params.rol;
    [err, user] = await to(User.findAll({
        include : [ {
            model: Rol,
            where: {
                descripcion:rol,
            },
        }]}));

    let user_json = [];
    for (let i in user) {
        //let roles = rol[i];
        user_json.push({id:user[i].id,nombre:user[i].email});
    }
    //let user1 ={id:user.id};

    if(err) TE(err.message);

    return ReS(res, {users:user_json});
}
module.exports.inspectores = inspectores;