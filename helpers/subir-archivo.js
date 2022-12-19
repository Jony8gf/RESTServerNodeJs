const path = require('path');
const { v4: uuidv4 }  = require('uuid');

const subirArchivo = (files, extensionPermitidas = ['png', 'jpg', 'jpeg', 'gif'], carpeta = '') => {

    return new Promise((resolve, reject) => {

        const { archivo } = files;

        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[nombreCortado.length - 1];

        //Extensiones permitidas y validar
        if (!extensionPermitidas.includes(extension)) {
            return reject(`La extension ${extension} no es permitida, utiliza una de las siguientes ${extensionPermitidas}`)
            // res.status(400).json({ msg: `La extension ${extension} no es permitida, utiliza una de las siguientes ${extensionPermitidas}` });
        }

        const nombreTemp = uuidv4() + '.' + extension;

        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);

        archivo.mv(uploadPath, (err) => {
            if (err) {
                console.log(err);
                // return res.status(500).send({ err });
                reject(err)
            }

            resolve(nombreTemp);
            // res.status(200).json({ msg: 'File uploaded to ' + uploadPath });
        });
    });
}

module.exports = {
    subirArchivo
}