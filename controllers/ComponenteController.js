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
        console.log("                                      ");
        console.log(cons_comp);
        componentes1.push(cons_comp);
    }
    let resultado =[];

    for(let i in componentes1){
        for(let j in componentes1[i]){
            resultado.push({id:componentes1[i][j].id, nombre:componentes1[i][j].nombre_comp,polo1:componentes1[i][j].poloa_comp,polo2:componentes1[i][j].polob_comp,polo3:componentes1[i][j].poloc_comp,equipo: componentes1[i][j].Equipo});
        }
    }
    return ReS(res, {componentes: resultado});

}
module.exports.getAllForSe = getAllForSe;