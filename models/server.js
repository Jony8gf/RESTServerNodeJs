const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Rutas
        this.authPath = "/auth";
        this.buscarPath = "/buscar"
        this.categoriasPath = "/categorias";
        this.productosPath = "/productos";
        this.usuariosPath = "/usuarios";
        this.uploadsPath = "/uploads";

        //Conectar a base de datos
        this.conectarDb();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDb(){
        await dbConnection();
    }

    middlewares(){

        //CORS
        this.app.use(cors());

        //Parseo Y Lectura del Body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

        // Note that this option available for versions 1.0.0 and newer. 
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.buscarPath, require('../routes/buscar'))
        this.app.use(this.categoriasPath, require('../routes/categorias'))
        this.app.use(this.productosPath, require('../routes/productos'))
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
        this.app.use(this.uploadsPath, require('../routes/uploads'))
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log("Servidor iniciado...")
        });
    }

}

module.exports = Server;