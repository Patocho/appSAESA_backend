const Rol = require('../models').Rol;

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