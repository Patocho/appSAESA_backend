const UserRols = require('../models').UserRols;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    if(!body.descripcion){
        return ReE(res, 'Por favor, nombre de Rol');
    } 
    else{
        let err, rol;

        [err, rol] = await to(Rol.create(body));

        if(err) return ReE(res, err, 422);
        return ReS(res, {message:'Rol creado satisfactoriamente'}, 201);
    }
}

module.exports.create = create;
//get all for a unique ID
const getRolesForUser = async function(id){
    let err,roles;
    [err, roles] = await to(UserRols.findAll({where:{UserId:id}}));
    return roles;
}
module.exports.getRolesForUser = getRolesForUser;

const quitarRol = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    let err, userrol, id_user, id_rol;

    id_user=body.id_user;
    id_rol=body.id_rol;

    [err, userrol] = await to (UserRols.destroy({where:{UserId: id_user, RolId: id_rol}}));
    if(err) return ReE(res, 'ERROR');

    return ReS(res, {message:'Rol Eliminado de Usuario'}, 201);
}
module.exports.quitarRol = quitarRol;

const asignarRol = async function (req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    let err, userrol, id_user, id_rol, ur;

    console.log(body);

    id_user=body.id_user;
    id_rol=body.id_rol;

    ur = {
        RolId: id_rol,
        UserId: id_user,
    };

    console.log(ur);

    [err, userrol] = await to (UserRols.create(ur));
    if(err) return ReE(res, 'Error al asignar un Rol');

    return ReS(res, {message: "Rol asignado satisfactoriamente"}, 201);
}
module.exports.asignarRol = asignarRol;