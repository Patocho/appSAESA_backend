const Subestacion = require('../models').Subestacion;
const Operacion = require('../models').Operacion;
const Ot =require('../models').Ot;
const Trampa = require('../models').Trampa;
const Op = require(Sequelize.Op);


const getAll = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, subestacions;

    [err, subestacions] = await to(Subestacion.findAll());
    if (err) return ReE(res, err, 422);

    let subestacions_json = [];
    for (let i in subestacions) {
        let subestacion = subestacions[i];
        let subestacions_info = subestacion.toWeb();

        subestacions_json.push({id:subestacions_info.id, cod_se:subestacions_info.cod_se, nombre:subestacions_info.nombre_se});
    }

    return ReS(res, {subestacions: subestacions_json});

}
module.exports.getAll = getAll;

const remove = async function(req, res){
    let subestacion, err;
    body = req.body;
    let idse = body.id;

    [err, trampa] = await to(Subestacion.destroy({where:{id:idse}}));
    if(err) return ReE(res, 'Un error se ha producido al intentar eliminar una Subestacion');

    return ReS(res, {message:'Subestacion eliminada'}, 204); 
}
module.exports.remove = remove;

const verDatos = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, usuario, rol, ots, ssee, subestacion, dato;
    const body = req.body;
    ssee_id = body.id;

    //datos SSEE solicitada
    [err, subestacion] = await to(Subestacion.findOne({where:{id:ssee_id}}));
    if(err) return ReE(res, 'Subestación NO encontrada');


    se = {
        subestacion : {
            id : subestacion.id,
            cod_se : subestacion.cod_se,
            nombre_se: subestacion.nombre_se,
        }
    }
    
    //ots asociadas a SSEE
    [err, ots] = await to(Ot.findAll({
        include:[{
            model:Operacion,
            paranoid:true,
            required:true,
            where:{[Op.ne]:Ot.OtId},
        }],
        where:{id:idse}

    }));

    return ReS(res, {ots}, 201);
}
module.exports.verDatos = verDatos;