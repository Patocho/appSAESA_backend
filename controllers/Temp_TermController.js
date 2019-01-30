const Temp_term = require('../models').Temp_term;
const Img_term = require('../models').Img_term;
const Operacion = require('../models').Operacion;

const getAllForPtos = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, puntos;
    img_id = req.params.img_id;

    [err, puntos] = await to(Temp_term.findAll({
        include:[{
            model:Img_term,
            paranoid:true,
            required:true,
        }],
        where:{operacionId: img_id,}
    }));
    if (err) return ReE(res, err, 422);


    return ReS(res,{x1:puntos.x1, y1:puntos.x1, x2:puntos.x2, y2:puntos.x2, x3:puntos.x3, y3:puntos.x3} );

}
module.exports.getAllForPtos = getAllForPtos;

