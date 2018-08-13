const User = require('../models').User;
const Rol = require('../models').Rol;
const Operacion = require('../models').Operacion;
const authService = require('./../services/AuthService');
const Roles = require('../models').UserRols;
const Ot =require('../models').Ot;
const Otra_tarea = require('../models').Otra_tarea;
const Trampa = require('../models').Trampa;
const Registro_estado = require('../models').Registro_estado;


const registro = async function(req, res){
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
    IdRegisto = reg.id;
    const otras_tareas={
        desmalezado:body.otras_tareas.desmalezado,
        corte_pasto_:body.otras_tareas.corte_pasto,
        nebulizacion:body.otras_tareas.nebulizacion,
        OperacionId: IdRegisto
    };
    [err, otras] = await to(Otra_tarea.create(otras_tareas));
    
    for(let i in body.trampas){
        const tramp = {
            cod_trampa:body.trampas[i].cod_trampa,
            estado_registro:body.trampas[i].estado,
            obs_registro:body.trampas[i].obs,
            OperacionId:IdRegisto,
            TrampaId:body.trampas[i].id,
        }
        let reg_trampa;
            [err, reg_trampa] = await to(Registro_estado.create(tramp));
        }

    return ReS(res,201);
}

module.exports.registro = registro;

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