const { Router } = require('express');
const { check } = require('express-validator');

const {usuariosGet, usuariosPost, usuariosPut, usuariosDelete} = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe ser más de 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no es váilido').isEmail(),
    check('role', 'No es un rol válido').isIn(['ADMIN', 'USER']),
    validarCampos
], usuariosPost);
router.put('/:id', usuariosPut);
router.delete('/', usuariosDelete);

module.exports = router;