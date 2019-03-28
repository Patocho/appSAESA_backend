const Img_term = require('../models').Img_term;

const getImage = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, image;
    situacion = req.params.situacion;
    [err, image] = await to(Img_term.findAll({
        //attributes: ['id'],
        where:{situacion: situacion}}));
    //console.log(image);
    if (err) return ReE(res, err, 422);

    let image_json = [];
    for (let i in image) {
        let imagen = image[i];
        let image_info = imagen.toJSON();
		
		image_json.push({id:image_info.id, nombre:image_info.nombre, recurso:image_info.recurso, tipo:image_info.tipo, situacion:image_info.situacion, id_comp:image_info.compId, id_op:image_info.operacionId});       
    }    
    return ReS(res, {image: image_json});

}
module.exports.getImage = getImage;

