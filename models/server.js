const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server{

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Rutas
        this.usuariosPath = "/usuarios";
        this.authPath = "/auth";

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
        this.app.use(cors())

        //Parseo Y Lectura del Body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log("Servidor iniciado...")
        });
    }

}

module.exports = Server;