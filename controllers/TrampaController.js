const Trampa = require('../models').Trampa;
const Subestacion = require('../models').Subestacion;
const Operacion = require('../models').Operacion;
const Ot = require('../models').Ot;
const Registro_estado = require('../models').Registro_estado;
const Sequelize = require('../node_modules/sequelize');

var sequelize = new Sequelize(process.env.LOCAL_DATABASE, process.env.LOCAL_USERNAME, process.env.LOCAL_PASSWORD,{
  host: '127.0.0.1',
  dialect: 'mysql',

  // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
  operatorsAliases: true
});
const Op = Sequelize.Op;


//
const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    if(!body.trampas){
        return ReE(res, 'Lista de trampas vacia');
    } 
    else{
        let err, trampas;
        let cont = 0;
        for(let i in body.trampas){
            [err, trampa] = await to(Trampa.findOne({where:{codigo_trampa:body.trampas[i].codigo_trampa}}));
            if (trampa != null){
                cont = cont +1;
            }
        }
        if(cont > 0){
            return ReE(res, 'Codigo de trampa ya existente')
        } 
        else{
            for(let i in body.trampas){
                [err, trampa] = await to(Trampa.create(body.trampas[i]));
            }
            if(err) return ReE(res, err, 422);
        }

        return ReS(res, {message:'Trampas creadas satisfactoriamente'}, 201);
    }
}
module.exports.create = create;


//metodo para obtener todas las trampas de una subestacion, recibe como parametro id de subestacion
const getAllForSe = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, trampas;
    se_id = req.params.se_id;

    [err, trampas] = await to(Trampa.findAll({
        include:[{
            model:Subestacion,
            paranoid:true,
            required:true,
        }],
        order:[['codigo_trampa','ASC']],
        where:{SubestacionId: se_id,}
    }));
    if (err) return ReE(res, err, 422);

    let trampas_json = [];
    for (let i in trampas) {
        let trampa = trampas[i];
        let trampas_info = trampa.toWeb();

        trampas_json.push({id:trampas_info.id, cod:trampas_info.codigo_trampa,tipo:trampas_info.tipo});
    }

    return ReS(res, {trampas: trampas_json});

}
module.exports.getAllForSe = getAllForSe;


//metodo para eliminar trampas, metodo recibe id de trampa a eliminar
const remove = async function(req, res){
    let trampa, err;
    body = req.body;
    let idt = body.id;

    [err, trampa] = await to(Trampa.destroy({where:{id:idt}}));
    if(err) return ReE(res, 'Un error se ha producido al intentar eliminar una trampa');

    return ReS(res, {message:'Trampa eliminada'}, 204); 
}
module.exports.remove = remove;


//metodo para crear trampas cuando una subestacion no tiene trampas creadas para cargar
const crearTrampaSE = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    body = req.body;

    idSe = body.id_se;
    cant = body.cantidad;

    let trp;
    [err,trp] = await to (Trampa.findAndCountAll({
        where:{
            tipo:'principal',
        }
    }));

    for (let i = 1; i<=cant; i++) {
        function PadLeft(value, length) {
            return (value.toString().length < length) ? PadLeft("0" + value, length) : 
            value;
        };
        codigo_trampa =PadLeft(trp.count + i,5);
        newTrp ={
            codigo_trampa:codigo_trampa,
            tipo:'principal',
            SubestacionId: idSe
        };

        [err, trampa] = await to(Trampa.create(newTrp));
    }
    return ReS(res, {message:'Trampas creadas satisfactoriamente'}, 201);
}
module.exports.crearTrampaSE=crearTrampaSE;


//metodo para creas las trampas suplemetarias que se agreguen en la aplicacion móvil, 
//retorna arreglo de id de las trampas creadas
const nuevasTrampas = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    let arrayId = [];

    if(!body.trampas){
        return ReE(res, 'Lista de trampas vacia');
    } 
    else{
        let err, trampas;
        let cont = 0;
        for(let i in body.trampas){
            [err, trampa] = await to(Trampa.findOne({where:{codigo_trampa:body.trampas[i].codigo_trampa}}));
            if(err) return ReE(res, err, "Error al buscar trampa");
            if (trampa != null){
                cont = cont +1;
            }
        }
        if(cont > 0){
            return ReE(res, 'Codigo de trampa ya existente')
        } 
        else{
            for(let i in body.trampas){
                [err, trampa] = await to(Trampa.create(body.trampas[i]));
                arrayId.push(trampa.id);
            }
            if(err) return ReE(res, err, 422);
        }

        return ReS(res, {arrayId:arrayId}, 201);
    }
}
module.exports.nuevasTrampas=nuevasTrampas;


//metodo para obtener historico de consumo de trampas por subestacion.
const consumoHistoricoSsee = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    let arrayId = [];
    let subestacionId = body.subestacionId;

    let err, operaciones, operaciones_json;
    operaciones_json = [];
    operaciones_json2= [];

    //con esto se piden los datos desde hace un año
    let hoy = new Date();
    hoy.setFullYear(hoy.getFullYear()-1);
    hoy.setHours(0,0,0);

    [err, operaciones] = await to (Operacion.findAll({
        include:[{
            model:Ot,
            paranoid:true,
            required: true,
            where:{trabajo:'Control de Plagas'},
            include:[{
                model:Subestacion,
                paranoid:true,
                required:true,
                where:{id:subestacionId}
            }]
        },{
            model:Registro_estado,
            paranoid:true,
            required:true
        }],
        where:{
            fechahora_inicio:{
                [Op.gte] : hoy
            }
        }
    }));
    if(err) return ReE(res, err, 422);


    for(i in operaciones){
        let operacion = operaciones[i];
        contador = 0;
        let contC =0;
        let contNC =0;
        let contD =0;
        let contE =0;

        let operacion_info2 = operacion.toWeb();
        operaciones_json2.push(operacion_info2);

        for (x in operacion.Registro_estados){
            contador = contador +1;
            if(operacion.Registro_estados[x].estado_registro == "Consumida"){
                contC = contC + 1;
            }
            if(operacion.Registro_estados[x].estado_registro == "No Consumida"){
                contNC = contNC + 1;
            }
            if(operacion.Registro_estados[x].estado_registro == "Dañada"){
                contD = contD + 1;
            }
            if(operacion.Registro_estados[x].estado_registro == "Extraida"){
                contE = contE + 1;
            }

        }
        let operacion_info = {
            cantidad_trampas : contador,
            cantidad_consumida : contC,
            cantidad_noconsumida : contNC,
            cantidad_dañada : contD,
            cantidad_extraida : contE,
            fecha: operacion.fechahora_inicio
        }

        operaciones_json.push(operacion_info);
    }

    return ReS(res, {datos:operaciones_json, datos2:operaciones_json2}, 201);
    
}
module.exports.consumoHistoricoSsee=consumoHistoricoSsee;
