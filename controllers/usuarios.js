const { response } = require('express');

const usuariosGet =(req, res = response) => {

    const query = req.query;

    res.json({
        msg: 'get Usuarios',
        query
    })
}

const usuariosPost =(req, res = response) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'post Usuarios',
        nombre,
        edad
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