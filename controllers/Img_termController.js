const Img_term = require('../models').Img_term;
const Componente = require('../models').Componente;
const Operacion = require('../models').Operacion;

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

const obtenerIdOperacion = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    id_ot=req.params.id_ot;

    let err, operacion;
    [err, operacion] = await to (Operacion.findOne({
        where:{OtId:id_ot}
    }));
    if (err) return ReE(res, err, 422);

    return ReS(res, {id:operacion.id});

}
module.exports.obtenerIdOperacion = obtenerIdOperacion;

const crearImagen = async function(req,res){
    res.setHeader('Content-Type','application/json');
    const body = req.body;
    let err, image,nueva_img;
    [err, image] = await to(Img_term.findOne({where:{nombre: body.imagenterm}}));

    if (image == null){
        const img = {
            nombre: body.imagenterm,
            tipo: body.termografica,
            situacion: body.pendiente,
            ComponenteId: body.id_comp,
            OperacionId: body.id_operacion,
        };
        [err,nueva_img] = await to(Img_term.create(img));
        if (err) return ReE(res, err, 422);
        return ReS(res, {id:img.id,message: 'Imagen creada satisfactoriamente'}, 201); 

    }
    else{
        return ReE(res, "Imagen: " + body.imagenterm + " ya existe", 422);
    }
}
module.exports.crearImagen = crearImagen;