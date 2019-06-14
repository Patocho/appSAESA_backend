const Operacion = require('../models').Operacion;
const Subestacion = require('../models').Subestacion;
const Ot = require('../models').Ot;
const Alerta = require('../models').Alerta;
const Trampa = require('../models').Trampa;
const Otra_tarea = require('../models').Otra_tarea;
const Img_control = require('../models').Img_control;
const Registro_estado = require('../models').Registro_estado;
const Img_tareas = require('../models').Img_tareas;
const User = require('../models').User;
const Equipo = require('../models').Equipo;
const Componente = require('../models').Componente;
const Img_term = require('../models').Img_term;
const Temp_term = require('../models').Temp_term;


const ObtenerParaSubestacionControl = async function(req, res){

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
            }],
            where:{trabajo:'Control de Plagas'}
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

module.exports.ObtenerParaSubestacionControl = ObtenerParaSubestacionControl;


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
    [err, operacionesControl] = await to(Operacion.findAndCountAll({
        include:[{
            model:Ot,
            paranoid:true,
            required:true,
            where:{
                trabajo:'Control de Plagas'
            }
        }],
    }));
    if(err) return ReE(res, err, 422);
    let cantOperacionControl = operacionesControl.count;

    [err, operacionesTermo] = await to(Operacion.findAndCountAll({
        include:[{
            model:Ot,
            paranoid:true,
            required:true,
            where:{
                trabajo:'Termografia'
            }
        }],
    }));
    if(err) return ReE(res, err, 422);
    let cantOperacionTermo = operacionesTermo.count;

    let cantidadOperaciones = operaciones_json.length;

    [err, OtCP] = await to (Ot.findAndCountAll({
        where:{trabajo :'Control de Plagas'}
    }));
    if(err) return ReE(res, err, 422);

    let contControl = OtCP.count;

    [err, OtT] = await to (Ot.findAndCountAll({
        where:{trabajo :'Termografia'}
    }));
    if(err) return ReE(res, err, 422);

    contTerm = OtT.count;


    return ReS(res,{operaciones:operaciones_json, cantidadOperaciones:cantidadOperaciones, cantOperacionControl:cantOperacionControl, cantOperacionTermo:cantOperacionTermo, cantidadOt:contTerm+contControl, cantidadControl:contControl, cantidadTerm:contTerm}, 201);
}

module.exports.ObtenerParaTodas = ObtenerParaTodas;


const ReporteControlPlagas = async function(req, res){

    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    let err, operacion, ot, subestacion, trampas, imgs, img_ot, alerta, otra_tarea, reg_estado;
    id = body.id;

    [err, operacion] = await to(Operacion.findOne({
        where:{id:id},
        include:[{
            model:User,
            paranoid:true,
            required:true
        }]
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
        inspector:operacion.User.nombre
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
            where:{OperacionId:id},
            include:[{
                model:Trampa,
                paranoid:true,
                required:true
            }],
        }],
        attributes:{exclude:['recurso']}
    }));
    if(err) ReE(res, err, 422);

    let imgs_id= []
    for(i in imgs){
        let img = imgs[i];
        let ids ={
            id:img.id,
            cod_trampa:img.Registro_estado.Trampa.codigo_trampa
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
        corte_pasto:otra_tarea.corte_pasto_,
        nebulizacion:otra_tarea.nebulizacion,
        obs_tarea:otra_tarea.obs_tarea
    };

    [err, reg_estado] = await to(Registro_estado.findAll({
        where:{OperacionId:id}
    }));
    if(err) ReE(res, err, 422);

    let registro_estados = [];
    for(a in reg_estado){
        let estado = reg_estado[a];
        let registro_estado_info = {
            id:estado.id,
            cod_trampa:estado.cod_trampa,
            estado_registro:estado.estado_registro,
            obs_registro:estado.obs_registro
        };
        registro_estados.push(registro_estado_info);
    }


    return ReS(res,{operacion:operacion_info, ot:ot_info, subestacion:subestacion_info, trampas: trampas_json, img_id:imgs_id , img_ot_id: img_ot_id, alerta: alertas_info, otra_tarea: otra_tarea_info, estados: registro_estados}, 201);
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

    return ReS(res, {imagenes: imgs}, 201);
}
module.exports.test = test;


const ReporteImagenTermica = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    let err, operacion, ot, subestacion, equipo, componente, imagenterm, imagennormal, alertas, temperatura;

    OperacionId = body.OperacionId;
    nombreImagen = body.nombreImagen;

    [err, operacion] = await to(Operacion.findOne({
        where:{id:OperacionId},
        include:[{
            model:User,
            paranoid:true,
            required:true
        }]
    }));
    if(err) return ReE(res, err, 422);
    ot_id = operacion.OtId;
    op_id = operacion.id;

    let operacion_info = {
        id:operacion.id,
        pt_operacion:operacion.pt_operacion,
        fechahora_inicio:operacion.fechahora_inicio,
        fechahora_fin:operacion.fechahora_fin,
        inspector:operacion.User.nombre
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

    [err,imagenterm] = await to(Img_term.findOne({
        where:{nombre:nombreImagen,OperacionId:op_id}

    }));
    if (err) return ReE(res, err, 422);
    id_comp = imagenterm.ComponenteId;
    id_img = imagenterm.id;
    
    let id_imgTerm = imagenterm.id;

   

    [err, componente] = await to(Componente.findOne({
        where:{id:id_comp}
    }));
    if (err) return ReE(res, err, 422);
    id_eq = componente.EquipoId;
    id_co = componente.id;

    let componente_info={
        id:componente.id,
        cod_comp:componente.cod_comp,
        nombre_comp:componente.nombre_comp,
        poloa_comp:componente.poloa_comp,
        polob_comp:componente.polob_comp,
        poloc_comp:componente.poloc_comp,
        EquipoId:componente.EquipoId
    };

    [err, equipo] = await to(Equipo.findOne({
        where:{id:id_eq, SubestacionId:se_id}
    }));
    if (err) return ReE(res, err, 422);

    let equipo_info = {
        id:equipo.id,
        cod_eq:equipo.cod_eq,
        nombre_eq:equipo.nombre_eq,
        ubic_tec_eq:equipo.ubic_tec_eq,
        tempmax:equipo.tempmax
    };

    [err, alertas] = await to(Alerta.findOne({
        where:{OperacionId:op_id}
    }));
    if(err) ReE(res, err, 422);

    let alertas_info = {
        id:alertas.id,
        alerta:alertas.alerta,
        nombreImagen:alertas.nombreImagen,
        estado:alertas.estado
    };

    [err, temperatura] = await to(Temp_term.findOne({
        where:{ImgtermId:id_img}
    }));
    if(err) ReE(res, err, 422);

    let temperatura_info = {
        id:temperatura.id,
        tem1:temperatura.tem1,
        tem2:temperatura.tem2,
        tem3:temperatura.tem3,
        delta12:temperatura.delta12,
        delta23:temperatura.delta23,
        delta31:temperatura.delta31
    };

    [err, imagennormal] = await to(Img_term.findOne({
        where:{OperacionId:op_id, ComponenteId:id_co, tipo:'Normal'}
    }));
    if (err) ReE(res, err, 422);

    let imagennormal_info ={
        id:imagennormal.id,
        nombre:imagennormal.nombre,
        recurso:imagennormal.recurso,
        ComponenteId:imagennormal.ComponenteId,
        OperacionId:imagennormal.OperacionId
    };

    return ReS(res,{
        operacion:operacion_info, 
        ot:ot_info, 
        subestacion:subestacion_info, 
        componente:componente_info, 
        equipo:equipo_info, 
        alertas:alertas_info, 
        imagenterm:id_imgTerm, 
        imagennormal:imagennormal_info, 
        temperatura:temperatura_info}, 201);
}
module.exports.ReporteImagenTermica = ReporteImagenTermica;

const ObtenerParaSubestacionTermo = async function(req, res){

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
            }],
            where:{trabajo:'Termografia'}
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

module.exports.ObtenerParaSubestacionTermo = ObtenerParaSubestacionTermo;

