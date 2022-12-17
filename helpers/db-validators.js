const { Categoria } = require('../models');
const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({role});
    if(!existeRol) throw new Error(`El rol -> ${role} no esta registrado`)
}

const emailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});

    if(existeEmail){
       throw new Error('El correo ya está registrado');
    }
}

const usuarioById = async (id = '') => {

    const existeUsuario = await Usuario.findById(id);

    if(!existeUsuario){
       throw new Error('El usuario no está registrado');
    }
}

const categoriaExistePorId = async (id = '') => {

    const existeCategoria = await Categoria.findById(id);

    if(!existeCategoria){
       throw new Error('La categoria no está registrado');
    }
}

module.exports= {
    esRoleValido, 
    emailExiste,
    usuarioById, 
    categoriaExistePorId
}