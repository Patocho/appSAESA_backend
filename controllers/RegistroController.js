const User = require('../models').User;
const Rol = require('../models').Rol;
const Operacion = require('../models').Operacion;
const authService = require('./../services/AuthService');
const Roles = require('../models').UserRols;
const Ot =require('../models').Ot;
const Otra_tarea = require('../models').Otra_tarea;
const Trampa = require('../models').Trampa;
const Registro_estado = require('../models').Registro_estado;
const Img_tareas = require('../models').Img_tareas;
const Img_control = require('../models').Img_control;
const Alerta = require('../models').Alerta;


const registroOperacion = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    console.log("============================");
    console.log(body);
    console.log("==============================");
    numero_ot = body.ot;
    [err, ots] = await to(Ot.findOne({where:{numero_ot: numero_ot}}));
    OtId = ots.id;

    const op ={
        pt_operacion:body.pt,
        fechahora_inicio: body.fecha_ini,
        fechahora_fin: body.fecha_fin,
        obs_operacion: body.obs_operacion,
        tr_ret:body.tr_ret,
        tr_inst:body.tr_inst,
        UserId: body.inspector,
        OtId: OtId
    };
    console.log("==========AAAAA=============");
    let reg;
    [err, reg] = await to(Operacion.create(op));
    if (err) return ReE(res, err, 422);
    IdRegisto = reg.id;

    const alert = {
        alerta:body.alerta,
        hanta:body.hanta
    };
    [err,al] = await to(Alerta.create(alert));

    for (let x in body.eliminarTrampas){
        const trampDelete = body.eliminarTrampas[x].id;
        let delTrampa;
        [err,delTrampa] = await to(Trampa.destroy({where:{id:trampDelete}}));
    }

    const otras_tareas={
        desmalezado:body.otras_tareas.desmalezado,
        corte_pasto_:body.otras_tareas.corte_pasto,
        nebulizacion:body.otras_tareas.nebulizacion,
        obs_tarea:body.otras_tareas.obs_tarea,
        OperacionId: IdRegisto
    };
    [err, otras] = await to(Otra_tarea.create(otras_tareas));

    return ReS(res, {id_op:IdRegisto}, 201);
}
module.exports.registroOperacion = registroOperacion;

const registroEstado = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    IdRegisto = body.id_op;
    let arrayId= [];

    for(let i in body.trampas){
        const tramp = {
            cod_trampa:body.trampas[i].cod_trampa,
            estado_registro:body.trampas[i].estado,
            obs_registro:body.trampas[i].obs,
            OperacionId:IdRegisto,
            TrampaId:body.trampas[i].id,
        };
        let reg_trampa;
        [err, reg_trampa] = await to(Registro_estado.create(tramp));
        arrayId.push(reg_trampa.id);
    }

    return ReS(res, {arrayId:arrayId}, 201);
}
module.exports.registroEstado = registroEstado;

const registroImgTrp = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    img_trp ={
        RegistroEstadoId : body.idRegEstado,
        recurso: body.recurso
    }
    let regImgTrp;
    [err,regImgTrp] = await to (Img_control.create(img_trp));
    if (err) return ReE(res, err, 422);
    
    return ReS(res, {msg:"Registro exitoso!"}, 201);
}
module.exports.registroImgTrp = registroImgTrp;

const registroImgOt = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    IdRegisto = body.OperacionId;

    img_ot ={
        OperacionId : IdRegisto,
        recurso: body.recurso
    }
    let regImgOt;
    [err,regImgOt] = await to (Img_tareas.create(img_ot));
    if (err) return ReE(res, err, 422);
    
    return ReS(res, {msg:"Registro exitoso!"});
}
module.exports.registroImgOt = registroImgOt;

const registrotermo = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    numero_ot = body.ot;
    [err, ots] = await to(Ot.findOne({where:{numero_ot: numero_ot}}));
    OtId = ots.id;

    const op ={
        pt_operacion:body.pt,
        fechahora_inicio: body.fecha_ini,
        fechahora_fin: body.fecha_fin,
        UserId: body.inspector,
        OtId: OtId
    };

    [err, reg] = await to(Operacion.create(op));
    
    return ReS(res,201);
}

module.exports.registrotermo = registrotermo;