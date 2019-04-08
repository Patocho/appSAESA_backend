const Img_term = require('../models').Img_term;
const Componente = require('../models').Componente;
const Operacion = require('../models').Operacion;

const getImage = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, image;
    const body = req.body;
    console.log("###############################################");
    console.log(body);
    nombre = body.nombre;
    [err, image] = await to(Img_term.findOne({
        //attributes: ['id'],
        where:{nombre: nombre}}));
    //console.log(image);
    if (err) return ReE(res, err, 422);
    console.log(image);
    return ReS(res, {id: image.id, nombre: image.nombre});

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
        return ReS(res, {id:nueva_img.id,message: 'Imagen creada satisfactoriamente'}, 201); 

    }
    else{
        return ReE(res, "Imagen: " + body.imagenterm + " ya existe", 422);
    }
}
module.exports.crearImagen = crearImagen;