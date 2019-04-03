const Img_tareas = require('../models').Img_tareas;
const Img_control = require('../models').Img_control;

const ObtenerImagenControl = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, imagen;
    const body = req.body;
    id = body.id;

    [err, imagen] = await to(Img_control.findOne({
        where:{id:id}
    }));
    if(err) return ReE(res, err, 422);

    console.log(imagen);
    return ReS(res, {recurso: imagen.recurso});
}
module.exports.ObtenerImagenControl = ObtenerImagenControl;


const ObtenerImagenTarea = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, alertas;

    return ReS(res, {alertas: alertas_json});

}
module.exports.ObtenerImagenTarea = ObtenerImagenTarea;