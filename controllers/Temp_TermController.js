const Temp_term = require('../models').Temp_term;
const Img_term = require('../models').Img_term;

const getAllForPtos = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, puntos;
    img_id = req.params.img_id;

    [err, puntos] = await to(Temp_term.findOne({
        include:[{
            model:Img_term,
            paranoid:true,
            required:true,
        }],
        where:{id: img_id,}
    }));
    if (err) return ReE(res, err, 422);


    return ReS(res,{x1:puntos.x1, y1:puntos.x1, x2:puntos.x2, y2:puntos.x2, x3:puntos.x3, y3:puntos.x3,x4:puntos.x4, y4:puntos.x4, x5:puntos.x5, y5:puntos.x5, x6:puntos.x6, y6:puntos.x6} );

}
module.exports.getAllForPtos = getAllForPtos;

const crearPuntos = async function(req,res){
    res.setHeader('Content-Type','application/json');
    const body = req.body;
    console.log(body);
    let err, puntos,nuevos_puntos;
    [err, puntos] = await to(Temp_term.findOne({where:{ImgTermId:body.id_img}}));

    if (puntos == null){
        const ptos = {
            x1:body.puntox1,
            y1:body.puntoy1,
            x2:body.puntox2,
            y2:body.puntoy2,
            x3:body.puntox3,
            y3:body.puntoy3,
            x4:body.puntox4,
            y4:body.puntoy4,
            x5:body.puntox5,
            y5:body.puntoy5,
            x6:body.puntox6,
            y6:body.puntoy6,
            ImgTermId:body.id_img,
        };
        [err,nuevos_puntos] = await to(Temp_term.create(ptos));
        if (err) return ReE(res, err, 422);
        return ReS(res, {message: 'puntos creados satisfactoriamente'}, 201); 

    }
    else{
        return ReE(res, "Ya existe", 422);
    }
    
}
module.exports.crearPuntos = crearPuntos;

