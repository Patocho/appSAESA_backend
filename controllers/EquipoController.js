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