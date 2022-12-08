const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet =(req, res = response) => {

    const query = req.query;

    res.json({
        msg: 'get Usuarios',
        query
    })
}

const usuariosPost = async (req, res = response) => {


    const {nombre, correo, password, role} = req.body;
    const usuario = new Usuario({nombre, correo, password, role});

    //Verificar si el correo existe
    const existeEmail = await Usuario.findOne({correo});

    if(existeEmail){
         return res.status(400).json({
            msg: 'El correo ya está registrado'
         })
    }

    //Enciptar constrseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(usuario.password, salt)

    //Guardar en base de datoss
    try{
        await usuario.save();
    }catch(error){
        console.log(error)
    }

    res.json({
        usuario
    })
}

const usuariosPut =(req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put Usuarios',
        id
    })
}

const usuariosDelete =(req, res = response) => {
    res.json({
        msg: 'delete Usuarios'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete 
}