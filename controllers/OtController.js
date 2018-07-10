const Ot = require('../models').Ot;

//get all for a unique ID
const getOt = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, ots;
    numero_ot = req.params.numero_ot;

    [err, ots] = await to(Ot.findOne({where:{numero_ot: numero_ot}}));
    if (err) return ReE(res, err, 422);
    if(!ots) return ReE(res, "OT no encontrada: "+numero_ot);

    return ReS(res, {numero_ot: ots.numero_ot, trabajo:ots.trabajo, id_se:ots.SubestacionId});

}
module.exports.getOt = getOt;