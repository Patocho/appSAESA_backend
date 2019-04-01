const Ot = require('../models').Ot;

//get all for a unique ID
const getOt = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, ots;
    numero_ot = req.params.numero_ot;

    [err, ots] = await to(Ot.findOne({where:{numero_ot: numero_ot}}));

    console.log(ots);
    if (err) return ReE(res, err, 422);
    if(!ots) return ReE(res, "OT no encontrada: "+numero_ot);

    return ReS(res, {numero_ot: ots.numero_ot, trabajo:ots.trabajo, id_se:ots.SubestacionId});

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
        return ReE(res, "OT número: " + body.numero_ot + " ya existe");
    }
    
}
module.exports.crearOt = crearOt;