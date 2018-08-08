const Componente = require('../models').Componente;
const Equipo = require('../models').Equipo;
const subestacion = require('../models').Subestacion;
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
        componentes1.push(cons_comp);
    }
    let resultado =[];

    for(let i in componentes1){
        for(let j in componentes1[i]){
            resultado.push({id:componentes1[i][j].id});
        }
    }
    return ReS(res, {componentes: resultado});

}
module.exports.getAllForSe = getAllForSe;