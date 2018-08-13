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

require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post('/users', UserController.create);
router.post('/users/login',UserController.login);
router.get('/inspectores/:rol',UserController.inspectores);

router.get('/subestacions',SubestacionController.getAll);

router.get('/ots/:numero_ot',OtController.getOt);

router.get('/trampas/:se_id',TrampaController.getAllForSe);
router.post('/creartrampas',TrampaController.create);

router.post('/rols', RolController.create);

router.get('/equipos/:se_id',EquipoController.getAllForSe);

router.get('/componentes/:se_id',ComponenteController.getAllForSe);

router.post('/registro',RegistroController.registro);

module.exports = router;