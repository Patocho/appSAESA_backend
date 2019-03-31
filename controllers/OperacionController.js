const Operacion = require('../models').Operacion;
const Subestacion = require('../models').Subestacion;
const Ot = require('../models').Ot;
const Alerta = require('../models').Alerta;


const ObtenerParaSubestacion = async function(req, res){

    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    let err, operaciones;
    id = body.id;

    [err, operaciones] = await to(Operacion.findAll({
        include:[{
            model:Ot,
            paranoid:true,
            required:true,
            include:[{
                model:Subestacion,
                paranoid:true,
                required:true,
                where:{id:id}
            }]
        }],
    }));
    if(err) return ReE(res, err, 422);

    let operaciones_json = [];
    for (let i in operaciones) {
        let operacion = operaciones[i];
        //let alertas_info = alerta.toJSON();
        let operaciones_info = {
            id:operacion.id,
            pt_operacion:operacion.pt_operacion,
            fechahora_inicio:operacion.fechahora_inicio,
            fechahora_fin:operacion.fechahora_fin,
            obs_operacion:operacion.obs_operacion,
            tr_ret:operacion.tr_ret,
            tr_inst:operacion.tr_inst,
            numero_ot:operacion.Ot.numero_ot,
            cod_se:operacion.Ot.Subestacion.cod_se,
            nombre_se:operacion.Ot.Subestacion.nombre_se,
        }

        operaciones_json.push(operaciones_info);
    }

    return ReS(res,{operaciones:operaciones_json}, 201);
}

module.exports.ObtenerParaSubestacion = ObtenerParaSubestacion;


const ObtenerParaTodas = async function(req, res){

    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    let err, operaciones;
    id = body.id;

    [err, operaciones] = await to(Operacion.findAll({
        include:[{
            model:Ot,
            paranoid:true,
            required:true,
            include:[{
                model:Subestacion,
                paranoid:true,
                required:true,
            }]
        }],
    }));
    if(err) return ReE(res, err, 422);

    let operaciones_json = [];
    for (let i in operaciones) {
        let operacion = operaciones[i];
        //let alertas_info = alerta.toJSON();
        let operaciones_info = {
            id:operacion.id,
            pt_operacion:operacion.pt_operacion,
            fechahora_inicio:operacion.fechahora_inicio,
            fechahora_fin:operacion.fechahora_fin,
            obs_operacion:operacion.obs_operacion,
            tr_ret:operacion.tr_ret,
            tr_inst:operacion.tr_inst,
            numero_ot:operacion.Ot.numero_ot,
            cod_se:operacion.Ot.Subestacion.cod_se,
            nombre_se:operacion.Ot.Subestacion.nombre_se,
        }

        operaciones_json.push(operaciones_info);
    }

    return ReS(res,{operaciones:operaciones_json}, 201);
}

module.exports.ObtenerParaTodas = ObtenerParaTodas;