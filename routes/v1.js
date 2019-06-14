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
const AlertaController = require('./../controllers/AlertaController');
const OperacionController = require('./../controllers/OperacionController');
const ImgControlController = require('./../controllers/ImgControlController');
const ImgTareasController = require('./../controllers/ImgTareasController');

require('./../middleware/passport')(passport)
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({status:"success", message:"Parcel Pending API", data:{"version_number":"v1.0.0"}})
});

router.post('/users',passport.authenticate('jwt', {session:false}),  UserController.create);
router.post('/users/login',UserController.login);
router.get('/inspectores/:rol',passport.authenticate('jwt', {session:false}),  UserController.inspectores);
router.get('/users', passport.authenticate('jwt', {session:false}), UserController.obtenerUsuarios);
router.post('/users/ver_datos',passport.authenticate('jwt', {session:false}),  UserController.verDatos);

router.get('/subestacions',passport.authenticate('jwt', {session:false}),  SubestacionController.getAll);
router.post('/borrarSE',passport.authenticate('jwt', {session:false}),  SubestacionController.remove);
router.post('/subestacion/ver_datos',passport.authenticate('jwt', {session:false}),  SubestacionController.verDatos);
router.post('/subestacion/nueva',passport.authenticate('jwt', {session:false}),  SubestacionController.crearNuevaSE);


router.get('/ots/:numero_ot',passport.authenticate('jwt', {session:false}),  OtController.getOt);
router.post('/nueva_ot',passport.authenticate('jwt', {session:false}),  OtController.crearOt);
router.post('/nueva_ot_codSe',passport.authenticate('jwt', {session:false}),  OtController.crearOtCodSeMasivo);
router.get('/ot/obtenerTodas',passport.authenticate('jwt', {session:false}),  OtController.obtenerTodas);
//router.post('/nueva_ot_codSe',passport.authenticate('jwt', {session:false}),  OtController.crearOtCodSe);

router.get('/trampas/:se_id',passport.authenticate('jwt', {session:false}),  TrampaController.getAllForSe);
router.post('/creartrampas',passport.authenticate('jwt', {session:false}), TrampaController.create);
router.post('/creartrampasse',passport.authenticate('jwt', {session:false}), TrampaController.crearTrampaSE);
router.post('/borrarTrampa',passport.authenticate('jwt', {session:false}), TrampaController.remove);
router.post('/registro/nuevas_trampas',passport.authenticate('jwt', {session:false}), TrampaController.nuevasTrampas);

router.post('/rols',passport.authenticate('jwt', {session:false}), RolController.create);
router.get('/rols/lista',passport.authenticate('jwt', {session:false}), RolController.listaRoles);

router.post('/users/quitar_rol',passport.authenticate('jwt', {session:false}), UserRolController.quitarRol);
router.post('/users/asignar_rol',passport.authenticate('jwt', {session:false}), UserRolController.asignarRol);

router.get('/equipos/:se_id',passport.authenticate('jwt', {session:false}), EquipoController.getAllForSe);

router.get('/componentes/:se_id',passport.authenticate('jwt', {session:false}), ComponenteController.getAllForSe);
router.get('/obtener_componentes/:se_id',passport.authenticate('jwt', {session:false}), ComponenteController.obtenerComponentes);

router.post('/registro/operacion',passport.authenticate('jwt', {session:false}), RegistroController.registroOperacion);
router.post('/registro/estado',passport.authenticate('jwt', {session:false}), RegistroController.registroEstado);
router.post('/registro/imgtrp',passport.authenticate('jwt', {session:false}), RegistroController.registroImgTrp);
router.post('/registro/imgot',passport.authenticate('jwt', {session:false}), RegistroController.registroImgOt);
router.post('/registro/termo',passport.authenticate('jwt', {session:false}), RegistroController.registrotermo);

router.post('/imgterm',passport.authenticate('jwt', {session:false}), Img_termController.getImage);
router.post('/nueva_img',passport.authenticate('jwt', {session:false}),  Img_termController.crearImagen);
router.get('/tempterm/:img_id',passport.authenticate('jwt', {session:false}), Temp_TermController.getAllForPtos);

router.get('/alertas/todas', passport.authenticate('jwt', {session:false}), AlertaController.ObtenerTodas);
router.post('/alertas/se', passport.authenticate('jwt', {session:false}), AlertaController.ObtenerSe);
router.post('/alertas/vista', passport.authenticate('jwt', {session:false}), AlertaController.AlertaVista);

router.post('/operacionControl/se', passport.authenticate('jwt', {session:false}), OperacionController.ObtenerParaSubestacionControl);
router.post('/operacion/todas', passport.authenticate('jwt', {session:false}), OperacionController.ObtenerParaTodas);

router.post('/controlplagas/reporte', passport.authenticate('jwt', {session:false}), OperacionController.ReporteControlPlagas);

router.post('/controlplagas/imagen', passport.authenticate('jwt', {session:false}), ImgControlController.ObtenerImagenControl);
router.post('/controlplagas/imagenTareas', passport.authenticate('jwt', {session:false}), ImgTareasController.ObtenerImagenTarea);

router.post('/test', passport.authenticate('jwt', {session:false}), TrampaController.consumoHistoricoSsee);

router.get('/obtenerIdOperacion/:id_ot', passport.authenticate('jwt', {session:false}), Img_termController.obtenerIdOperacion);
router.post('/nuevos_puntos',passport.authenticate('jwt', {session:false}),  Temp_TermController.crearPuntos);
router.post('/updatetemp', passport.authenticate('jwt', {session:false}), Temp_TermController.updateTemp);
router.post('/updateimagen', passport.authenticate('jwt', {session:false}), Img_termController.updateImagen);
router.post('/alertatermo', passport.authenticate('jwt', {session:false}), AlertaController.alertaTermo);
router.post('/nuevoequipo',passport.authenticate('jwt', {session:false}),  EquipoController.crearEquipo);
router.post('/updateequipo',passport.authenticate('jwt', {session:false}),  EquipoController.updateEquipo);
router.post('/nuevocomponente',passport.authenticate('jwt', {session:false}),  ComponenteController.crearComponente);
router.post('/componentes',passport.authenticate('jwt', {session:false}),  ComponenteController.obtenerEqComp);
router.post('/updatecomponente',passport.authenticate('jwt', {session:false}),  ComponenteController.updateComponente);
router.post('/borrarcomponente',passport.authenticate('jwt', {session:false}),  ComponenteController.eliminarComponente);
router.post('/borrarequipo',passport.authenticate('jwt', {session:false}),  EquipoController.eliminarEquipo);
router.post('/termografia/reporte', passport.authenticate('jwt', {session:false}), OperacionController.ReporteImagenTermica);
router.post('/termografia/Imagen_termo', passport.authenticate('jwt', {session:false}), Img_termController.getImageTermo);
router.post('/termografia/Imagen_normal', passport.authenticate('jwt', {session:false}), Img_termController.getImageNormal);
router.post('/operacionTermo/se', passport.authenticate('jwt', {session:false}), OperacionController.ObtenerParaSubestacionTermo);
router.post('/se', passport.authenticate('jwt', {session:false}), SubestacionController.obtenerUnaSub);
router.post('/imagentermo', passport.authenticate('jwt', {session:false}), Img_termController.getUnaImageTermo);

module.exports = router;