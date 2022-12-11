const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require("../models/usuario");
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req = request, res = response) => {

    const {correo, password} = req.body;

    try{

        //Verificar si email existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario o Contraseña no es correcto'
            }) 
        }
        //Si el usuario esta activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario no disponible su estado es false'
            }) 
        }
        //Verificar contraseña
        const validarPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validarPassword){
            return res.status(400).json({
                msg: 'Usuario o Contraseña no es correcto'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario, token
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            msg: 'Ha ocrrido un error inesperado'
        })  
    } 
}

module.exports = {
    login
}