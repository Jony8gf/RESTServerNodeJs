const { Router } = require('express');
const { check } = require('express-validator');

const {usuariosGet, usuariosPost, usuariosPut, usuariosDelete} = require('../controllers/usuarios');
const { esRoleValido, emailExiste, usuarioById } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y debe ser más de 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no es váilido').isEmail(),
    check('correo').custom(emailExiste),
    // check('role', 'No es un rol válido').isIn(['ADMIN', 'USER']),
    check('role').custom(esRoleValido),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioById),
    check('role').custom(esRoleValido),
    validarCampos
], usuariosPut);

router.delete('/:id',[
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(usuarioById)
], usuariosDelete);

module.exports = router;