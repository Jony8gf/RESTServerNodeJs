 const {Schema, model} = require('mongoose');
const { usuarioById } = require('../helpers/db-validators');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        required: true,
        // emun: ['ADMIN', 'USER']
    },
    estado: {
        type: Boolean,
        default: true
    },
    estado: {
        type: Boolean,
        default: false
    }
});

UsuarioSchema.methods.toJSON = function() {
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id
    return user;
}

module.exports = model('Usuario', UsuarioSchema);