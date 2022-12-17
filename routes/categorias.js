const { Router } = require('express');
const { check } = require('express-validator');

const { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } = require('../controllers/categorias');
const { categoriaExistePorId } = require('../helpers/db-validators');

const { validarJWT, tieneRoles,  validarCampos} = require('../middlewares');

const router = Router();

//Obtener todas las categorias PUBLICO
router.get('/', obtenerCategorias);

//Obtener una  categoria por id
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoriaExistePorId),
    validarCampos
],obtenerCategoria);

//Crear una  categoria
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);

//Modificar una  categoria
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria);

//Eliminar una  categoria - ADMIN
router.delete('/:id', [
    validarJWT,
    tieneRoles("ADMIN", "VENTAS"),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(categoriaExistePorId),
    validarCampos
], borrarCategoria);


module.exports = router;