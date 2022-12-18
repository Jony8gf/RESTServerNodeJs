const { response, request } = require('express');

const {Producto} = require('../models');

//obtenerProductos - paginado - total - populate
const obtenerProductos = async (req = request, res = response) => {
    const {limite = 5, desde = 0 } = req.query;
    const query = {estado: true};

    const productos = await Producto.find(query)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')
        .limit(Number(limite))
        .skip(Number(desde));
    
    const total = productos.length;

    res.json({
        msg: 'get Categorias',
        total,
        productos
    })
}

//obtenerProducto
const obtenerProducto = async (req = request, res = response) => {
    const {id} = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre').populate('categoria', 'nombre');

    res.json(producto);
}


//crearProducto
const crearProducto = async (req = request, res = response) => {
    const {estado, usuario, nombre, ...body} = req.body;
    const productoDb = await Producto.findOne({nombre});

    if(productoDb){
        return res.status(400).json({
            msg: `El producto ${nombre} ya existe`
        })
    }

    //Generar data a guardar
    const data = {
        ...body,
        nombre: nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    const producto = new Producto(data);

    //Guarda db
    await producto.save();

    res.status(201).json(producto);

}

//modificarProducto
const modificarProducto = async (req = request, res = response) => {
    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

    //Generar data a guardar
    if(data.nombre) data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, {new: true})
    res.status(201).json(producto);
}

//eliminarProducto
const eliminarProducto = async (req = request, res = response) => {
    const {id} = req.params;
    const productoDelete = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});
    res.status(200).json(productoDelete);
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    modificarProducto,
    eliminarProducto
}