require('dotenv').config();
const Subestacion = require('../models').Subestacion;
const Operacion = require('../models').Operacion;
const Ot =require('../models').Ot;
const Trampa = require('../models').Trampa;
const Sequelize = require('../node_modules/sequelize');
const sequelize = new Sequelize(process.env.LOCAL_DATABASE, process.env.LOCAL_USERNAME, process.env.LOCAL_PASSWORD, {
  host: '127.0.0.1',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: false
});
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
    
    datos_ot =[];
    let sql = "SELECT `Ot`.`id`, `Ot`.`numero_ot`, `Ot`.`fecha_ot`, `Ot`.`trabajo`, `Ot`.`createdAt`, `Ot`.`updatedAt`, `Ot`.`deletedAt`, `Ot`.`SubestacionId` FROM `Ots` AS `Ot` INNER JOIN `Operacions` AS `Operacions` ON `Ot`.`id` != `Operacions`.`OtId` AND (`Operacions`.`deletedAt` > '2019-02-04 19:38:26' OR `Operacions`.`deletedAt` IS NULL) WHERE ((`Ot`.`deletedAt` > '2019-02-04 19:38:26' OR `Ot`.`deletedAt` IS NULL) AND `Ot`.`SubestacionId` = '4')"
    sequelize.query(sql, { type: sequelize.QueryTypes.SELECT}).then(function(ots){
        for(let a in ots){
            //console.log(ots[a].id);
            let ot ={
                id: ots[a].id,
                numero_ot:ots[a].numero_ot,
                fecha_ot:ots[a].fecha_ot,
                trabajo:ots[a].trabajo,
                SubestacionId:ots[a].SubestacionId
            }
            datos_ot.push(ot);
        }
    });

    
    return ReS(res, {dato:{subestacion:se, ots:datos_ot}}, 201);
}
module.exports.verDatos = verDatos;