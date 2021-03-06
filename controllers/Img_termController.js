const Img_term = require('../models').Img_term;
const Componente = require('../models').Componente;
const Operacion = require('../models').Operacion;

const getImage = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, image;
    const body = req.body;
    nombre = body.nombre;
    [err, image] = await to(Img_term.findOne({
        //attributes: ['id'],
        where:{nombre: nombre}
    }));
    
    if (err) return ReE(res, err, 422);
    return ReS(res, {id: image.id, nombre: image.nombre, id_oper: image.OperacionId});

}
module.exports.getImage = getImage;

const obtenerIdOperacion = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    id_ot=req.params.id_ot;

    let err, operacion;
    [err, operacion] = await to (Operacion.findOne({
        where:{OtId:id_ot},
        paranoid:true,
        required:true,
    }));
    if (err) return ReE(res, err, 422);

    return ReS(res, {id:operacion.id});

}
module.exports.obtenerIdOperacion = obtenerIdOperacion;

const crearImagen = async function(req,res){
    res.setHeader('Content-Type','application/json');
    const body = req.body;
    let err, image,nueva_img;
    [err, image] = await to(Img_term.findOne({
        where:{nombre: body.imagenterm},
        paranoid:true,
        required:true,
    }));

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

const updateImagen = async function(req,res){
    res.setHeader('Content-Type','application/json');
    const body = req.body;
    id_img = body.id_img;
    recurso = body.recurso;
    let err, image;
    [err, image] = await to(Img_term.update({
        recurso:recurso,},{
        where:{id:id_img},
        paranoid:true,
        required:true,
        }));

    if(err) return ReE(res,"no encontrado" );

    return ReS(res, {msg:"Update exitoso"}, 201);
}
module.exports.updateImagen = updateImagen;

const getImageTermo = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, image;
    const body = req.body;
    id = body.id;
    [err, image] = await to(Img_term.findOne({
        //attributes: ['id'],
        where:{id:id}
    }));

    imgcomplete = image.recurso;
    
    if (err) return ReE(res, err, 422);
    return ReS(res, {recurso:imgcomplete},201);

}
module.exports.getImageTermo = getImageTermo;

const getImageNormal = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, image;
    const body = req.body;
    id = body.id;
    [err, image] = await to(Img_term.findOne({
        //attributes: ['id'],
        where:{id:id}
    }));

    imgcomplete = image.recurso;
    
    if (err) return ReE(res, err, 422);
    return ReS(res, {recurso:imgcomplete},201);

}
module.exports.getImageNormal = getImageNormal;

const getUnaImageTermo = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, image;
    const body = req.body;
    ComponenteId = body.ComponenteId;
    OperacionId = body.OperacionId;
    [err, image] = await to(Img_term.findOne({
        //attributes: ['id'],
        where:{OperacionId:OperacionId, ComponenteId:ComponenteId, tipo:'Termografica'}
    }));

    if (err) return ReE(res, err, 422);
    return ReS(res, {id: image.id, nombre: image.nombre, id_oper: image.OperacionId});
    
}
module.exports.getUnaImageTermo = getUnaImageTermo;