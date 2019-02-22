const express 			= require('express');
const router 			= express.Router();

const custom 	        = require('./../middleware/custom');
const passport      	= require('passport');
const path              = require('path');

const UserController = require('./../controllers/UserController');
const RolController = require('./../controllers/RolController');
const SubestacionController = require('./../controllers/SubestacionController');
const TrampaController = require('./../controllers/TrampaController');
const OtController = require('./../controllers/OtController');
const EquipoController = require('./../controllers/EquipoController');
const ComponenteController = require('./../controllers/ComponenteController');
const RegistroController = require('./../controllers/RegistroController');
const Img_termController = require('./../controllers/Img_termController');
const Temp_TermController = require('./../controllers/Temp_TermController');
const UserRolController = require('./../controllers/UserRolController');

require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post('/users', UserController.create);
router.post('/users/login',UserController.login);
router.get('/inspectores/:rol',UserController.inspectores);
router.get('/users',UserController.obtenerUsuarios);
router.post('/users/ver_datos',UserController.verDatos);

router.get('/subestacions',SubestacionController.getAll);
router.post('/borrarSE',SubestacionController.remove);
router.post('/subestacion/ver_datos',SubestacionController.verDatos);

router.get('/ots/:numero_ot',OtController.getOt);
router.post('/nueva_ot',OtController.crearOt);

router.get('/trampas/:se_id',TrampaController.getAllForSe);
router.post('/creartrampas',TrampaController.create);
router.post('/creartrampasse',TrampaController.crearTrampaSE);
router.post('/borrarTrampa',TrampaController.remove);
router.post('/registr/nuevas_trampas', TrampaController.nuevasTrampas);

router.post('/rols', RolController.create);
router.get('/rols/lista', RolController.listaRoles);

router.post('/users/quitar_rol',UserRolController.quitarRol);
router.post('/users/asignar_rol',UserRolController.asignarRol);

router.get('/equipos/:se_id',EquipoController.getAllForSe);

router.get('/componentes/:se_id',ComponenteController.getAllForSe);

router.post('/registro/operacion',RegistroController.registroOperacion);
router.post('/registro/estado',RegistroController.registroEstado);
router.post('/registro/imgtrp',RegistroController.registroImgTrp);
router.post('/registro/imgot',RegistroController.registroImgOt);

router.get('/imgterm/:situacion',Img_termController.getImage);

router.get('/tempterm/:img_id',Temp_TermController.getAllForPtos);

module.exports = router;