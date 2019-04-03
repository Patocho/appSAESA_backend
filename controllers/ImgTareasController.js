const Img_tareas = require('../models').Img_tareas;

const ObtenerImagenTarea = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, imagen;
    const body = req.body;

    id = body.id;

    [err, imagen] = await to(Img_tareas.findOne({
        where:{id:id}
    }));
    if(err) return ReE(res, err, 422);

    return ReS(res, {recurso: imagen.recurso});
}
module.exports.ObtenerImagenTarea = ObtenerImagenTarea;
