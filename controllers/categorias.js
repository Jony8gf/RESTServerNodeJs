const { response, request } = require('express');

const {Categoria, Usuario} = require('../models');


//obtenerCategorias - paginado - total - populate
const obtenerCategorias = async (req = request, res = response) => {

    const {limite = 5, desde = 0 } = req.query;
    const query = {estado: true}

    const categorias = await Categoria.find(query)
        .populate('usuario', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde));

    const total = categorias.length;

    res.json({
        msg: 'get Categorias',
        total,
        categorias
    })
}

//obtenerCategoria  - populate
const obtenerCategoria = async (req = request, res = response) => {
    const {id} = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json(categoria);
}

const crearCategoria = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDb = await Categoria.findOne({nombre});

    if(categoriaDb){
        return res.status(400).json({
            msg: `La categoria ${nombre} ya existe`
        })
    }

    //Generar data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    console.log(data);
    
    const categoria = new Categoria(data);

    //Guarda db
    await categoria.save();

    res.status(201).json(categoria);

}

//actualizarCategoria 
const actualizarCategoria = async (req = request, res = response) => {

    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    //Generar data a guardar
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, {new: true})
    res.status(201).json(categoria);
}

// borrarCategoria - Estado:false
const borrarCategoria = async (req = request, res = response) => {
    const {id} = req.params;
    const categoriaDelete = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});
    res.status(200).json(categoriaDelete);
}

module.exports = {
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}