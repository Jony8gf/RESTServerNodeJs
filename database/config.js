const mongoose = require('mongoose');

const dbConnection = async () => {
    try{

        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            //Parametros obsoletos
            // useCreateIndex: true, 
            // useFindAndModify: false
        });

        console.log('Base de datos conectada')

    }catch(error){
        console.log(error);
        // throw new Error('Error en la conexion a la base de datos')
    }
}

module.exports= {
    dbConnection
}