const { Router } = require('express');
const { check } = require('express-validator');

const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validarCampos, validarArchivo } = require('../middlewares');

const router = Router();

router.get('/:coleccion/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);

router.post('/',validarArchivo, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivo,
    check('id', 'No es un ID válido').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagenCloudinary);
// ], actualizarImagen);


module.exports = router;