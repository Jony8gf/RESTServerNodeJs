const { response, request } = require('express');

const esAdminRole = (req = request, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin verificar el token primero'
        })
    }

    const {role, nombre} = req.usuario;

    if(role !== 'ADMIN'){
        return res.status(401).json({
            msg: `${nombre} no es administrador`
        })
    }

    next();

}


const tieneRoles = (...roles) => {

    return (req = request, res = response, next) => {

        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin verificar el token primero'
            })
        }

        console.log(req.usuario.role)

        if(!roles.includes(req.usuario.role)){
            return res.status(401).json({
                msg: 'El servicio requiere uno de estos roles '+roles
            })
        }
    
        next();
    }
}


module.exports ={
    esAdminRole,
    tieneRoles
}