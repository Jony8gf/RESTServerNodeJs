const { response, request, json } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require("../models/usuario");
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSignIn = async (req = request, res = response) => {
    const {id_token} = req.body;

    try {

        const {nombre, correo, img} = await googleVerify(id_token);
        // const googleUser = await googleVerify(id_token);
        // console.log(googleUser);

        //Generar Referncia
        let usuario = await Usuario.findOne({correo});

        if(!usuario){
            //Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true, 
                role: 'USER'
            };

            usuario = new Usuario(data);
            await usuario.save();
        }

        //Si el usuario en DB
        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado.'
            })
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            msg: 'TODO OK',
            usuario,
            token
        }) 
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        })
    }


}

module.exports = {
    login, 
    googleSignIn
}