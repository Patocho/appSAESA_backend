const Operacion = require('../models').Operacion;
const Subestacion = require('../models').Subestacion;
const Ot = require('../models').Ot;
const Alerta = require('../models').Alerta;
const Trampa = require('../models').Trampa;
const Otra_tarea = require('../models').Otra_tarea;
const Img_control = require('../models').Img_control;
const Registro_estado = require('../models').Registro_estado;
const Img_tareas = require('../models').Img_tareas;


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


const ReporteControlPlagas = async function(req, res){

    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    let err, operacion, ot, subestacion, trampas, imgs, img_ot, alerta, otra_tarea;
    id = body.id;

    [err, operacion] = await to(Operacion.findOne({
        where:{id:id}
    }));
    if(err) return ReE(res, err, 422);
    ot_id = operacion.OtId;

    let operacion_info = {
        id:operacion.id,
        pt_operacion:operacion.pt_operacion,
        fechahora_inicio:operacion.fechahora_inicio,
        fechahora_fin:operacion.fechahora_fin,
        obs_operacion:operacion.obs_operacion,
        tr_ret:operacion.tr_ret,
        tr_inst:operacion.tr_inst,
    };

    [err, ot] = await to (Ot.findOne({
        where:{id:ot_id}
    }));
    if(err) return ReE(res, err, 422);
    se_id = ot.SubestacionId;

    let ot_info = {
        id:ot.id,
        numero_ot:ot.numero_ot,
        fecha_ot:ot.fecha_ot,
        trabajo:ot.trabajo
    };

    [err, subestacion] = await to (Subestacion.findOne({
        where:{id:se_id}
    }));
    if(err) return ReE(res, err, 422);

    let subestacion_info = {
        id:subestacion.id,
        cod_se:subestacion.cod_se,
        nombre_se:subestacion.nombre_se
    };

    [err, trampas] = await to(Trampa.findAll({
        where:{SubestacionId:se_id}
    }));
    if(err) return ReE(res, err, 422);

    let trampas_json =[]
    for(let i in trampas){
        let trampa = trampas[i];
        let trampas_info ={
            id:trampa.id,
            codigo_trampa:trampa.codigo_trampa,
            tipo:trampa.tipo
        };
        trampas_json.push(trampas_info);
    }
    
    [err, imgs] = await to (Img_control.findAll({
        include:[{
            model:Registro_estado,
            paranoid:true,
            required:true,
            where:{OperacionId:id}
        }],
        attributes:{exclude:['recurso']}
    }));
    if(err) ReE(res, err, 422);

    let imgs_id= []
    for(i in imgs){
        let img = imgs[i];
        let ids ={
            id:img.id
        };
        imgs_id.push(ids);
    }

    [err, img_ot] = await to(Img_tareas.findAll({
        where: {OperacionId: id}
    }));
    if(err) ReE(res, err, 422);

    let img_ot_id =[];

    for(i in img_ot){
        let imgOt = img_ot[i];
        let ids_ot ={
            id:imgOt.id
        }
        img_ot_id.push(ids_ot);
    }

    [err, alerta] = await to (Alerta.findOne({
        where:{OperacionId:id}
    }));
    if(err) ReE(res, err, 422);

    let alertas_info = {
        id:alerta.id,
        alerta:alerta.alerta,
        hanta:alerta.hanta,
        estado:alerta.estado
    };

    [err, otra_tarea] = await to(Otra_tarea.findOne({
        where:{OperacionId:id}
    }));
    if(err) ReE(res, err, 422);

    otra_tarea_info ={
        id:otra_tarea.id,
        desmalezado:otra_tarea.desmalezado,
        corte_pasto:otra_tarea.corte_pasto,
        nebulizacion:otra_tarea.nebulizacion,
        obs_tarea:otra_tarea.obs_tarea
    };

    return ReS(res,{operacion:operacion_info, ot:ot_info, subestacion:subestacion_info, trampas: trampas_json, img_id:imgs_id , img_ot_id: img_ot_id, alerta: alertas_info, otra_tarea: otra_tarea_info}, 201);
}

module.exports.ReporteControlPlagas = ReporteControlPlagas;



const test = async function(req, res){

    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    let err, operacion, ot, subestacion, trampas, imgs;
    id = body.id;

    [err, imgs] = await to (Img_control.findAll({
        include:[{
            model:Registro_estado,
            paranoid:true,
            required:true,
            where:{OperacionId:id}
        }],
        attributes:{exclude:['recurso']}
    }));
    if(err) ReE(res, err, 422);

    let imgs_id= []
    for(i in imgs){
        let img = imgs[i];
        let ids ={
            id:img.id
        };
        imgs_id.push(ids);
    }
    return ReS(res, {imagenes: imgs_id}, 201);
}

module.exports.test = test;