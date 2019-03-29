const Alerta = require('../models').Alerta;

//get all for a unique ID
const ObtenerTodas = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, alertas;

    [err, alertas] = await to(Alerta.findAll({where:{estado: se_id}}));
    if (err) return ReE(res, err, 422);

    let alertas_json = [];
    for (let i in alertas) {
        let alerta = alertas[i];
        let alertas_info = alerta.toJSON();

        alertas_json.push(alertas_info);
    }

    return ReS(res, {alertas: alertas_json});

}
module.exports.ObtenerTodas = ObtenerTodas;