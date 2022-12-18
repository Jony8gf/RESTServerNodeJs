const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerProductos, obtenerProducto, eliminarProducto, modificarProducto, crearProducto } = require('../controllers/productos');
const { productoExistePorId, categoriaExistePorId } = require('../helpers/db-validators');

const { validarJWT, tieneRoles,  validarCampos} = require('../middlewares');

const router = Router();

//Obtener todas los productos PUBLICO
router.get('/', obtenerProductos);

//Obtener un producto por id
router.get('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(productoExistePorId),
    validarCampos
],obtenerProducto);

//Crear un producto
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID válido de mongo').isMongoId(),
    check('categoria').custom(categoriaExistePorId),
    validarCampos
], crearProducto);

//Modificar un producto
router.put('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(productoExistePorId),
    check('categoria', 'No es un ID válido de mongo').isMongoId(),
    // check('categoria').custom(categoriaExistePorId),
    validarCampos
], modificarProducto);

//Eliminar un producto - ADMIN
router.delete('/:id', [
    validarJWT,
    tieneRoles("ADMIN", "VENTAS"),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(productoExistePorId),
    validarCampos
], eliminarProducto);


module.exports = router;