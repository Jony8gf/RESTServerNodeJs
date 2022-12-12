const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login',[
    check('password', 'El password es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').isEmail(),
    validarCampos
], login);

router.post('/google',[
    check('id_token', 'IdToken es necesario').not().isEmpty(),
    validarCampos
], googleSignIn);

module.exports = router;