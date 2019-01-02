const Trampa = require('../models').Trampa;
const Subestacion = require('../models').Subestacion;

const create = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    if(!body.trampas){
        return ReE(res, 'Lista de trampas vacia');
    } 
    else{
        let err, trampas;
        let cont = 0;
        for(let i in body.trampas){
            [err, trampa] = await to(Trampa.findOne({where:{codigo_trampa:body.trampas[i].codigo_trampa}}));
            if (trampa != null){
                cont = cont +1;
            }
        }
        if(cont > 0){
            return ReE(res, 'Codigo de trampa ya existente')
        } 
        else{
            for(let i in body.trampas){
                [err, trampa] = await to(Trampa.create(body.trampas[i]));
            }
            if(err) return ReE(res, err, 422);
        }

        return ReS(res, {message:'Trampas creadas satisfactoriamente'}, 201);
    }
}
module.exports.create = create;
//get all for a unique ID
const getAllForSe = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    let err, trampas;
    se_id = req.params.se_id;

    [err, trampas] = await to(Trampa.findAll({
        include:[{
            model:Subestacion,
            paranoid:true,
            required:true,
        }],
        order:[['codigo_trampa','ASC']],
        where:{SubestacionId: se_id,}
    }));
    if (err) return ReE(res, err, 422);

    let trampas_json = [];
    for (let i in trampas) {
        let trampa = trampas[i];
        let trampas_info = trampa.toWeb();

        trampas_json.push({id:trampas_info.id, cod:trampas_info.codigo_trampa,tipo:trampas_info.tipo});
    }

    return ReS(res, {trampas: trampas_json});

}
module.exports.getAllForSe = getAllForSe;

const remove = async function(req, res){
    let trampa, err;
    body = req.body;
    let idt = body.id;

    [err, trampa] = await to(Trampa.destroy({where:{id:idt}}));
    if(err) return ReE(res, 'Un error se ha producido al intentar eliminar una trampa');

    return ReS(res, {message:'Trampa eliminada'}, 204); 
}
module.exports.remove = remove;

const crearTrampaSE = async function(req, res){
    res.setHeader('Content-Type', 'application/json');
    body = req.body;

    idSe = body.se_id;
    cant = body.cantidad;

    console.log("######################");
    console.log(body);
    console.log("#################");

    let trp;
    [err,trp] = await to (Trampa.findAndCountAll({
        where:{
            tipo:'principal',
        }
    }));


    /*let trampas_json = [];
    for (let i in trp) {
        let trampa = trp[i];
        let trampas_info = trampa.toWeb();

        trampas_json.push({id:trampas_info.id, cod:trampas_info.codigo_trampa,tipo:trampas_info.tipo});
    }*/

    for (let i = 1; i<=cant; i++) {
        function PadLeft(value, length) {
            return (value.toString().length < length) ? PadLeft("0" + value, length) : 
            value;
        };
        codigo_trampa =PadLeft(trp.count + i,5);
        newTrp ={
            codigo_trampa:codigo_trampa,
            tipo:'principal',
            SubestacionId: idSe
        };

        [err, trampa] = await to(Trampa.create(newTrp));
    }
    return ReS(res, {message:'Trampas creadas satisfactoriamente'}, 201);
}
module.exports.crearTrampaSE=crearTrampaSE;