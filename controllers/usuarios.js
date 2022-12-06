const { response } = require('express');
const Usuario = require('../models/usuario');

const usuariosGet =(req, res = response) => {

    const query = req.query;

    res.json({
        msg: 'get Usuarios',
        query
    })
}

const usuariosPost = async (req, res = response) => {

    const body = req.body;
    const usuario = new Usuario(body);

    try{
        await usuario.save();
    }catch(error){
        console.log(error)
    }

    res.json({
        msg: 'post Usuarios',
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