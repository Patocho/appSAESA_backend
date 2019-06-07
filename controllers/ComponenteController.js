const Componente = require('../models').Componente;
const Equipo = require('../models').Equipo;
const Subestacion = require('../models').Subestacion;
//get all for a unique ID
const getAllForSe = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, componentes1, equipo,dato;
    se_id = req.params.se_id;

    [err,equipo] = await to(Equipo.findAll({
        include:[{
            model:Subestacion,
            paranoid:true,
            required:true,
        }],
        where:{SubestacionId : se_id},
    }));
    if (err) return ReE(res, err, 422);
    componentes1 = [];
    let cons_comp;
    for (let i in equipo){
        [err,cons_comp]=await to(Componente.findAll({
            include:[{model:Equipo,
                where:{EquipoId:equipo[i].id},
                order:[['posicion','ASC']],
            }]
        }));
        componentes1.push({nombre:equipo[i].nombre_eq, componentes:cons_comp});
    }

    return ReS(res, {equipos: componentes1});

}
module.exports.getAllForSe = getAllForSe;


const obtenerComponentes = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, componentes, equipo,dato;
    se_id = req.params.se_id;

    [err, componentes] = await to(Componente.findAll({
        include:[{
            model:Equipo, 
            paranoid:true,
            required:true,
            include:[{
                model:Subestacion,
                paranoid:true, 
                required:true,
                where:{id:se_id},
                order:[['posicion','ASC']],
            }]
        }]
    }));
    if(err) return ReE(res, err, 422);

    let componentes_json= [];

    for(i in componentes){
        let componentes_info ={
            id:componentes[i].id,
            nombre_comp:componentes[i].nombre_comp,
            nombre_equipo:componentes[i].Equipo.nombre_eq,
            id_se:componentes[i].Equipo.SubestacionId
        }
        componentes_json.push(componentes_info);
    }

    return ReS(res, {componentes: componentes_json});

}
module.exports.obtenerComponentes = obtenerComponentes;

const obtenerEqComp = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, componentes;
    const body = req.body;
    equipoId = body.equipoId;

    [err, componentes] = await to(Componente.findAll({
        include:[{
            model:Equipo,
            paranoid:true, 
            required:true,
            where:{id: equipoId},
        }]
    }));

    if (err) return ReE(res, err, 422);
    let componentes_json = [];
    for (let i in componentes) {
        let componente = componentes[i];
        let componentes_info = componente.toWeb();

        componentes_json.push(componentes_info);
    }
    if (componentes_json.length == 0){
        return ReE(res, "Equipo no posee componentes creados", 422);
    }
    else{
        return ReS(res, {componentes: componentes_json});
    }
}
module.exports.obtenerEqComp = obtenerEqComp;

const crearComponente = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;
    let err, componente, nuevo_componente;

    const comp = {
        cod_comp: body.cod_comp,
        nombre_comp: body.nombre_comp,
        poloa_comp: body.poloa_comp,
        polob_comp: body.polob_comp,
        poloc_comp: body.poloc_comp,
        EquipoId: body.equipoId
    };

    [err, componente] = await to(Componente.findOne({
        where:{cod_comp: body.cod_comp},
        paranoid : false
    }));

    if (componente == null){
        [err, nuevo_componente] = await to(Componente.create(comp));
        if (err) return ReE(res, err, 422);

        return ReS(res, {message:'Componente creado satisfactoriamente'}, 201);
    }else if(componente.deletedAt != null){
        [err, nuevo_componente] = await to(Componente.update({deletedAt :null},
            {
                where:{cod_comp: body.cod_comp},
                paranoid:false
            }));
       if (err) return ReE(res, "Ha ocurrido un error al intentar crear el nuevo componente", 422);

       return ReS(res, {message:"Se ha creado el componente satisfactoriamente"}, 201); 
    }
    else{
        return ReE(res, "Componente: " + body.cod_comp + " ya existe", 422);
    }
    
}
module.exports.crearComponente = crearComponente;

const updateComponente = async function(req,res){
    res.setHeader('Content-Type','application/json');
    const body = req.body;
    id_comp = body.id_comp;
    cod_comp = body.cod_comp;
    nombre_comp = body.nombre_comp;
    poloa_comp = body.poloa_comp;
    polob_comp = body.polob_comp;
    poloc_comp = body.poloc_comp;
    let err, componente;
    [err, componente] = await to(Componente.update({cod_comp:cod_comp,nombre_comp:nombre_comp,poloa_comp:poloa_comp,polob_comp:polob_comp,poloc_comp:poloc_comp},{
        where:{id:id_comp},
        paranoid:true,
        required:true,
        }));

    if(err) return ReE(res,"no encontrado" );

    return ReS(res, {msg:"Update exitoso"}, 201);
}
module.exports.updateComponente = updateComponente;

const eliminarComponente =async function(req,res){
    res.setHeader('Content-Type', 'application/json');
    let componente, err;
    body = req.body;
    let id_comp = body.id_comp;

    [err, componente] = await to(Componente.destroy({where:{id:id_comp}}));
    if(err) return ReE(res, 'Un error se ha producido al intentar eliminar el Componente', 422);

    return ReS(res, {message:'Componente eliminado'}, 201); 
}
module.exports.eliminarComponente = eliminarComponente;