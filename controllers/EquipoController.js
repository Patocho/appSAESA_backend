const Equipo = require('../models').Equipo;

//get all for a unique ID
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

    return ReS(res, {equipos: equipos_json});

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
        SubestacionId: body.SubestacionId,
    };

    [err, ots] = await to(Ot.findOne({where:{cod_eq: body.cod_eq}}));

    if (ots == null){
        [err, nuevo_equipo] = await to(Equipo.create(equip));
        if (err) return ReE(res, err, 422);

        return ReS(res, {message:'Equipo creado satisfactoriamente'}, 201);
    }
    else{
        return ReE(res, "Equipo: " + body.cod_eq + " ya existe", 422);
    }
    
}
module.exports.crearEquipo = crearEquipo;