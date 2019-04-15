const Ot = require('../models').Ot;
const Subestacion = require('../models').Subestacion;

//get all for a unique ID
const getOt = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, ots;
    numero_ot = req.params.numero_ot;

    [err, ots] = await to(Ot.findOne({where:{numero_ot: numero_ot}}));

    console.log(ots);
    if (err) return ReE(res, err, 422);
    if(!ots) return ReE(res, "OT no encontrada: "+numero_ot, 422);

    return ReS(res, {id: ots.id, numero_ot: ots.numero_ot, trabajo:ots.trabajo, id_se:ots.SubestacionId});

}
module.exports.getOt = getOt;

const crearOt = async function(req, res){
	res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    const ot = {
    	numero_ot: body.numero_ot,
      	fecha_ot: body.fecha_ot,
      	trabajo: body.trabajo,
      	SubestacionId: body.SubestacionId,
    };

    [err, ots] = await to(Ot.findOne({where:{numero_ot: body.numero_ot}}));

    if (ots == null){
        let nueva_ot;
        [err, nueva_ot] = await to(Ot.create(ot));
        if (err) return ReE(res, err, 422);

        return ReS(res, {message:'Ot creada satisfactoriamente'}, 201);
    }
    else{
        return ReE(res, "OT número: " + body.numero_ot + " ya existe", 422);
    }
    
}
module.exports.crearOt = crearOt;


const crearOtCodSe = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    let cod_se = body.cod_se;
    let err, ots, subestacion;

    [err, subestacion] = await to (Subestacion.findOne({
        where:{cod_se:cod_se}
    }));
    if(err) return ReE(res, err, 422);

    if(subestacion != null){
        const ot = {
            numero_ot: body.numero_ot,
            fecha_ot: body.fecha_ot,
            trabajo: body.trabajo,
            SubestacionId: subestacion.id,
        };

        [err, ots] = await to(Ot.findOne({where:{numero_ot: body.numero_ot}}));

        if (ots == null){
            let nueva_ot;
            [err, nueva_ot] = await to(Ot.create(ot));
            if (err) return ReE(res, err, 422);

            return ReS(res, {message:'Ot creada satisfactoriamente'}, 201);
        }
        else{
            return ReE(res, "OT número: " + body.numero_ot + " ya existe", 422);
        }
    }

    else{
        return ReE(res, "Subestacion no encontrada (Codigo " + cod_se +")", 422);
    }
    
}
module.exports.crearOtCodSe = crearOtCodSe;


const obtenerTodas = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, ots

    [err, ots] = await to(Ot.findAll({
        include:[{
            model:Subestacion,
            paranoid:true,
            requider:true,
        }]
    }));
    if(err) return ReE(res, err, 422);

    ots_json =[];
    for(let i in ots){
        let ot_info ={
            numero_ot:ots[i].numero_ot,
            fecha_ot:ots[i].fecha_ot,
            trabajo:ots[i].trabajo,
            subestacion:ots[i].Subestacion.nombre_se
        }
        ots_json.push(ot_info);
    }
    return ReS(res,{ots : ots_json}, 201); 
}
module.exports.obtenerTodas = obtenerTodas;


const crearOtCodSeMasivo = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    let err, ots, subestacion, ots_reg, ot_exist;
    
    ots = [];

    for(i in body){
        let arreglo = JSON.parse(body[i]);

        [err, subestacion] = await to (Subestacion.findOne({
            where:{cod_se:arreglo.cod_se},
            attributes: ['id']
        }));
        if (err) return ReE(res, "Subestacion no encontrada (Codigo " + arreglo.cod_se +")", 422);

        [err, ot_exist] = await to (Ot.findOne({
            where:{numero_ot:arreglo.numero_ot},
            attributes: ['id']
        }));

        if (ot_exist == null){
            let ot ={
                numero_ot:arreglo.numero_ot,
                fecha_ot:arreglo.fecha_ot,
                trabajo:arreglo.trabajo,
                SubestacionId:subestacion.id
            }
            ots.push(ot);
        }

        else{
            return ReE(res, "OT número: " + arreglo.numero_ot + " ya existe", 422);
        }
    }

    [err, ots_reg] = await to (Ot.bulkCreate(ots));
    if (err) console.log(err);

    return ReS(res, {message:'Ots creadas satisfactoriamente'}, 201);
}
module.exports.crearOtCodSeMasivo = crearOtCodSeMasivo;