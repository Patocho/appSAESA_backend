const Subestacion = require('../models').Subestacion;
const Operacion = require('../models').Operacion;
const Ot =require('../models').Ot;
const Trampa = require('../models').Trampa;
const Sequelize = require('sequelize');
var sequelize = new Sequelize('testsaesa', 'root', 'patoxox132100');
const Op = Sequelize.Op;


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
    /*[err, ots] = await to(Ot.findAll({
        attributes: ['id','numero_ot','fecha_ot','trabajo'],
        include:[{
            model:Operacion,
            attributes:['id'],
            paranoid:true,
            required:true,
            //where:{id:null}
        }],
        where:{SubestacionId:ssee_id}

    }));*/

    sequelize.query('SELECT * FROM Ots', ots).then(function(ots){
        console.log(ots);
    });

    datos_ot =[];

    for (let i in ots){
        let ot = ots[i];
        let ot_info = ot.toWeb();
        console.log(ot_info);
        datos_ot.push(ot_info);
    }
    console.log("#################################");
    console.log(datos_ot);
    console.log("#################################");
    return ReS(res, {datos_ot}, 201);
}
module.exports.verDatos = verDatos;