const Equipo = require('../models').Equipo;
const Subestacion = require('../models').Subestacion;

const getAllForSe = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, equipos;
    se_id = req.params.se_id;

    [err, equipos] = await to(Equipo.findAll({where:{SubestacionId: se_id}}));
    if (err) return ReE(res, err, 422);

    let equipos_json = [];
    for (let i in equipos) {
        let equipo = equipos[i];
        let equipos_info = equipo.toWeb();

        equipos_json.push(equipos_info);
    }
    if (equipos_json.length == 0){
        return ReE(res, "Subestación no posee equipos creados", 422);
    }
    else{
        return ReS(res, {equipos: equipos_json});
    }
}

module.exports.getAllForSe = getAllForSe;

const crearEquipo = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    let err, equipo, nuevo_equipo;

    const equip = {
        cod_eq: body.cod_eq,
        nombre_eq: body.nombre_eq,
        ubic_tec_eq: body.ubic_tec_eq,
        posicion:body.posicion,
        tempmax:body.tempmax,
        SubestacionId: body.SubestacionId,
    };

    [err, equipo] = await to(Equipo.findOne({where:{cod_eq: body.cod_eq}}));

    if (equipo == null){
        [err, nuevo_equipo] = await to(Equipo.create(equip));
        if (err) return ReE(res, err, 422);

        return ReS(res, {message:'Equipo creado satisfactoriamente'}, 201);
    }
    else{
        return ReE(res, "Equipo: " + body.cod_eq + " ya existe", 422);
    }
    
}
module.exports.crearEquipo = crearEquipo;

const updateEquipo = async function(req,res){
    res.setHeader('Content-Type','application/json');
    const body = req.body;
    id_eq = body.id_eq;
    cod_eq = body.cod_eq;
    nombre_eq = body.nombre_eq;
    ubic_tec_eq = body.ubic_tec_eq;
    posicion = body.posicion;
    tempmax = body.tempmax;
    let err, equipo;
    [err, equipo] = await to(Equipo.update({cod_eq:cod_eq,nombre_eq:nombre_eq,ubic_tec_eq:ubic_tec_eq,posicion:posicion,tempmax:tempmax},{
        where:{id:id_eq}
        }));

    if(err) return ReE(res,"no encontrado" );

    return ReS(res, {msg:"Update exitoso"}, 201);
}
module.exports.updateEquipo = updateEquipo;