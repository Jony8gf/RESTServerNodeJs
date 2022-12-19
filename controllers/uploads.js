const path = require('path');
const fs = require('fs');

const { response, request } = require('express');
const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models');



const cargarArchivo = async (req = request, res = response) => {

    try{
        //Imagenes
        // const nombre = await subirArchivo(req.files);

        //Ficheros texto
        const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        res.json({nombre});
    }
    catch(e){
        res.status(400).json({e})
    }
    
}

const actualizarImagen = async  (req = request, res = response)  => {
    
    const {id, coleccion} = req.params;

    let modelo;
    
    switch(coleccion){
        case 'usuarios':
                modelo = await Usuario.findById(id);
                if(!modelo){
                    return res.status(400).json({msg: `No existe el usuario ${id}`});
                }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
                if(!modelo){
                    return res.status(400).json({msg: `No existe el producto ${id}`});
                }
            break;
        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'});
    }

    try{

        //Limpiar imagenes previas
        if(modelo.img){
            //Hay que borrar la imagen del servidor
            const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
            if(fs.existsSync(pathImagen)){
                fs.unlinkSync(pathImagen);
            }
        }

        const nombre = await subirArchivo(req.files, undefined, coleccion);
        modelo.img = nombre;
        await modelo.save();
        res.json(modelo);
    }
    catch(e){
        res.status(400).json({e})
    }
}

module.exports = {
    cargarArchivo,
    actualizarImagen
}