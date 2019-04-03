const Componente = require('../models').Componente;
const Equipo = require('../models').Equipo;
const Subestacion = require('../models').Subestacion;
//get all for a unique ID
const getAllForSe = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, componentes1, equipo,dato;
    se_id = req.params.se_id;

    [err,equipo] = await to(Equipo.findAll({
        where:{SubestacionId : se_id},
    }));
    if (err) return ReE(res, err, 422);
    componentes1 = [];
    let cons_comp;
    for (let i in equipo){
        [err,cons_comp]=await to(Componente.findAll({
            where:{EquipoId:equipo[i].id},
            include:[{model:Equipo}]
        }));
        componentes1.push({nombre:equipo[i].nombre_eq, componentes:cons_comp});
    }

    return ReS(res, {equipos: componentes1});

}
module.exports.getAllForSe = getAllForSe;


const obtenerComponentes = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, componentes, equipo,dato;
    se_id = req.params.se_id;

    [err, componentes] = await to(Componente.findAll({
        include:[{
            model:Equipo, 
            paranoid:true,
            required:true,
            include:[{
                model:Subestacion,
                paranoid:true, 
                required:true,
                where:{id:se_id}
            }]
        }]
    }));
    if(err) return ReE(res, err, 422);

    let componentes_json= [];

    for(i in componentes){
        let componentes_info ={
            id:componentes[i].id,
            nombre_comp:componentes[i].nombre_comp,
            nombre_equipo:componentes[i].Equipo.nombre_eq
        }
        componentes_json.push(componentes_info);
    }

    return ReS(res, {componentes: componentes_json});

}
module.exports.obtenerComponentes = obtenerComponentes;