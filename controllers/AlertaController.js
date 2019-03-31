const Alerta = require('../models').Alerta;
const Subestacion = require('../models').Subestacion;
const Operacion = require('../models').Operacion;
const Ot = require('../models').Ot;


const ObtenerTodas = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, alertas;

    [err, alertas] = await to(Alerta.findAll({
        include:[{
            model:Operacion,
            paranoid:true,
            required:true,
            include:[{
                model:Ot,
                paranoid:true,
                required:true,
                include:[{
                    model:Subestacion,
                    paranoid:true,
                    required:true,
                }]
            }]
        }],
        where:{estado: null},
    }));
    if (err) return ReE(res, err, 422);

    let alertas_json = [];
    for (let i in alertas) {
        let alerta = alertas[i];
        //let alertas_info = alerta.toJSON();
        let alertas_info = {
            id:alerta.id,
            alerta:alerta.alerta,
            hanta:alerta.hanta,
            OperacionId:alerta.OperacionId,
            fecha:alerta.Operacion.Ot.fecha_ot,
            trabajo:alerta.Operacion.Ot.trabajo,
            subestacion:alerta.Operacion.Ot.Subestacion.nombre_se
        }

        alertas_json.push(alertas_info);
    }

    return ReS(res, {alertas: alertas_json});

}
module.exports.ObtenerTodas = ObtenerTodas;


const AlertaVista = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    let err, alerta;

    id = body.id;

    [err,alerta] = await to (Alerta.update({estado:'visto'},{
        where:{id:id}
    }));
    if(err) return ReE(res, 'Error marcar como "Visto"');

    return ReS(res, {msg:"Marcado como Visto exitosamente"}, 201);
}
module.exports.AlertaVista = AlertaVista;