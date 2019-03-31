const Operacion = require('../models').Operacion;
const Subestacion = require('../models').Subestacion;
const Ot = require('../models').Ot;
const Alerta = require('../models').Alerta;


const ObtenerParaSubestacion = async function(req, res){

    res.setHeader('Content-Type', 'application/json');
    const body = req.body;

    let err, operaciones;
    id = body.id;

    [err, operaciones] = await to(Alerta.findAll({
        include:[{
            model:Operacion,
            paranoid:true,
            required:true,
            include:[{
                model:Ot,
                paranoid:true,
                required:true,
                include:[{
                    model:Subestacion,
                    paranoid:true,
                    required:true,
                    where:{id:id}
                }]
            }]
        }],
    }));
    if(err) return ReE(res, err, 422);

    return ReS(res,{operaciones:operaciones}, 201);
}

module.exports.ObtenerParaSubestacion = ObtenerParaSubestacion;