const Trampa = require('../models').Trampa;

//get all for a unique ID
const getAllForSe = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, trampas;
    se_id = req.params.se_id;

    [err, trampas] = await to(Trampa.findAll({where:{SubestacionId: se_id}}));
    if (err) return ReE(res, err, 422);

    let trampas_json = [];
    for (let i in trampas) {
        let trampa = trampas[i];
        let trampas_info = trampa.toWeb();

        trampas_json.push({id:trampas_info.id, cod:trampas_info.codigo_trampa,tipo:trampas_info.tipo});
    }

    return ReS(res, {trampas: trampas_json});

}
module.exports.getAllForSe = getAllForSe;