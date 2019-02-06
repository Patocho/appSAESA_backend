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

const quitarRol = async function(id_user, id_rol){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    let err, userrol, id_user, id_rol;

    id_user=body.id_user;
    id_rol=body.id_rol;

    [err, userrol] = await to (UserRols.findOne({where:{UserId: id_user, RolId: id_rol}}));
    if(err) return ReE(res, 'ERROR');

    console.log(userrol);
}
module.exports.quitarRol = quitarRol;