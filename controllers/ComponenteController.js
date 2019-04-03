const Componente = require('../models').Componente;
const Equipo = require('../models').Equipo;
const Subestacion = require('../models').Subestacion;
//get all for a unique ID
const getAllForSe = async function(req, res){
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


    return ReS(res, {componentes});

}
module.exports.getAllForSe = getAllForSe;