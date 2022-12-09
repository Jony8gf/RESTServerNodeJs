const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    const {limite = 5, desde = 0 } = req.query;
    const query = {estado: true}
    const usuarios = await Usuario.find(query)
        .limit(Number(limite))
        .skip(Number(desde));

    // const total = await Usuario.countDocuments(query);
    const total = usuarios.length;

    // const resp = await Promise.all([
    //     Usuario.find(query)
    //         .limit(Number(limite))
    //         .skip(Number(desde)),    
    // ]);

    res.json({
        msg: 'get Usuarios',
        total,
        usuarios
    })
}

const usuariosPost = async (req, res = response) => {

    const {nombre, correo, password, role} = req.body;
    const usuario = new Usuario({nombre, correo, password, role});

    //Verificar si el correo existe --> se paso a db-validators.js

    //Enciptar constrseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(usuario.password, salt);

    //Guardar en base de datoss
    try{
        await usuario.save();
    }catch(error){
        console.log(error)
    }

    res.json(usuario)
}

const usuariosPut = async (req, res = response) => {

    const {id} = req.params;
    const {_id, __v, google, password, correo, ...resto} = req.body;

    //TOdo validar id
    if(password){
        //Enciptar constrseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
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