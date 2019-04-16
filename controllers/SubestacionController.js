require('dotenv').config();
const Subestacion = require('../models').Subestacion;
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

    [err, subestacions] = await to(Subestacion.findAll({order:[['nombre_se','ASC']]}));
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
    res.setHeader('Content-Type', 'application/json');
    let subestacion, err;
    body = req.body;
    let idse = body.id;

    [err, trampa] = await to(Subestacion.destroy({where:{id:idse}}));
    if(err) return ReE(res, 'Un error se ha producido al intentar eliminar una Subestacion', 422);

    return ReS(res, {message:'Subestacion eliminada'}, 201); 
}
module.exports.remove = remove;

const verDatos = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, usuario, rol, ots, ssee, subestacion, dato, algo, contador_img, contador_img2;
    const body = req.body;
    ssee_id = body.id;

    //datos SSEE solicitada
    [err, subestacion] = await to(Subestacion.findOne({where:{id:ssee_id}}));
    if(err) return ReE(res, 'Subestación NO encontrada', 422);

    if(subestacion == null){
        return ReE(res, 'Subestación NO encontrada', 422);
    }

    [err, contador_img] = await to (Img_control.findAndCountAll({
        attributes: ['id'],
        include:[{
            model:Registro_estado,
            paranoid: true,
            required: true,
            include:[{
                model:Trampa,
                paranoid: true,
                required: true,
                where:{SubestacionId: ssee_id }
            }],
        }],
    }));
    if(err) return ReE(res, 'Error Fatal', 422);

    /*if(contador_img == null){
        return ReE(res, '#####################NUUULOOOOOOOOOOO##############');
    }*/

    let cantImg1 = contador_img.count;

    [err, contador_img2] = await to (Img_tareas.findAndCountAll({
        attributes: ['id'],
        include:[{
            model:Operacion,
            paranoid: true,
            required: true,
            include:[{
                model:Ot,
                paranoid: true,
                required: true,
                include:[{
                    model:Subestacion,
                    paranoid:true,
                    required:true,
                    where:{id: ssee_id }
                }],
            }],
        }],
    }));
    if(err) return ReE(res, 'Error Fatal2', 422);

    let cantImg2 = contador_img2.count;

    let datos_ot =[];
    //let sql = 
    
    [err, algo] = await to (sequelize.query("SELECT Ots.* FROM Ots LEFT OUTER JOIN Operacions ON Ots.id = Operacions.OtId WHERE Operacions.OtId is null AND Ots.deletedAt is null AND Ots.SubestacionId = ?",
     {replacements: [ssee_id], type: sequelize.QueryTypes.SELECT}).then(function(ots){
        for(let a in ots){
            //console.log(ots[a].id);
            let ot = ots[a];

            datos_ot.push({
                id: ot.id,
                numero_ot:ot.numero_ot,
                fecha_ot:ot.fecha_ot,
                trabajo:ot.trabajo,
                SubestacionId:ot.SubestacionId
            });
        }
    }).catch(err =>{if(err) return ReE(res, 'Subestación NO encontrada', 422);})
     );

    dato = {
        subestacion : {
            id : subestacion.id,
            cod_se : subestacion.cod_se,
            nombre_se: subestacion.nombre_se,
        },
        datos_ot,
        cantImg: cantImg1 + cantImg2,
    }

    


    
    
    return ReS(res, {dato}, 201);
}
module.exports.verDatos = verDatos;


const crearNuevaSE = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, sube;
    body = req.body;

    let cod_se = body.cod_se;
    let nombre_se = body.nombre_se;

    [err, sube] = await to(Subestacion.findOne({
        where:{cod_se:cod_se}
    }));
    if(err) return ReE(res, 'Un error se ha producido al intentar verificar existencia de subestación');

    let se ={
        cod_se : cod_se,
        nombre_se: nombre_se
    }
    
    let subestacion
    if (sube == null) {
       [err, subestacion] = await to(Subestacion.create(se));
       if (err) return ReE(res, "Ha ocurrido un error al intentar crear nueva subestación", 422);

       return ReS(res, {message:"Se ha creado la subestación " + nombre_se + " satisfactoriamente"}, 201); 
    }

    else{
        return ReE(res, "Ya existe subestación con código " + cod_se, 422);
    }
    
}
module.exports.crearNuevaSE = crearNuevaSE;

