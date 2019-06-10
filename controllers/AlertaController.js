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
       
        if (alerta[i].trabajo == "Control de Plagas"){ 
            let alertas_info = {
                id:alerta.id,
                alerta:alerta.alerta,
                hanta:alerta.hanta,
                alertaTermo:alerta.alertaTermo,
                nombreImagen:alerta.nombreImagen,
                OperacionId:alerta.OperacionId,
                fecha:alerta.Operacion.Ot.fecha_ot,
                trabajo:alerta.Operacion.Ot.trabajo,
                subestacion:alerta.Operacion.Ot.Subestacion.nombre_se
            }
            alertas_json.push(alertas_info);
        }else if(alerta[i].trabajo == "Termografia" && alerta[i].OperacionId != alerta[i+1].OperacionId){
            let alertas_info = {
                id:alerta.id,
                alerta:alerta.alerta,
                hanta:alerta.hanta,
                alertaTermo:alerta.alertaTermo,
                nombreImagen:alerta.nombreImagen,
                OperacionId:alerta.OperacionId,
                fecha:alerta.Operacion.Ot.fecha_ot,
                trabajo:alerta.Operacion.Ot.trabajo,
                subestacion:alerta.Operacion.Ot.Subestacion.nombre_se
            }
            alertas_json.push(alertas_info);
        }
       
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

const alertaTermo = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    IdRegisto = body.id;

    const alert = {
        alerta:body.alerta,
        alertaTermo:body.alertaTermo,
        nombreImagen:body.nombreImagen,
        OperacionId: IdRegisto
    };
    [err,al] = await to(Alerta.create(alert));
    
    return ReS(res,201);

}
module.exports.alertaTermo = alertaTermo;


const ObtenerSe = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, alertas;
    const body = req.body;

    id_se = body.id;

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
                    where:{id:id_se}
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
module.exports.ObtenerSe = ObtenerSe;

const ObtenerAlertTermo = async function(req, res){
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
         if (alerta[i].trabajo == "Termografia"){ 
            let alertas_info = {
                id:alerta.id,
                alerta:alerta.alerta,
                hanta:alerta.hanta,
                alertaTermo:alerta.alertaTermo,
                nombreImagen:alerta.nombreImagen,
                OperacionId:alerta.OperacionId,
                fecha:alerta.Operacion.Ot.fecha_ot,
                trabajo:alerta.Operacion.Ot.trabajo,
                subestacion:alerta.Operacion.Ot.Subestacion.nombre_se
            }       
            alertas_json.push(alertas_info);
        }
    }

    return ReS(res, {alertas: alertas_json});

}
module.exports.ObtenerAlertTermo = ObtenerAlertTermo;