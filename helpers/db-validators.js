const { Categoria, Producto } = require('../models');
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

const productoExistePorId = async (id = '') => {

    const existeProducto = await Producto.findById(id);

    if(!existeProducto){
       throw new Error('El prodcuto no está registrado');
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);
    if(!incluida){
        throw new Error(`La coleccion ${coleccion} no es permitida, colecciones permitidas: ${coleccionesPermitidas} `)
    }
    return true;
}

module.exports= {
    esRoleValido, 
    emailExiste,
    usuarioById, 
    categoriaExistePorId,
    productoExistePorId,
    coleccionesPermitidas
}