const Usuarios = require('../models/Usuarios');

module.exports.crearUsuario = (req, res) => {

    res.render('crear_cuenta', {
        titulo: 'Crear Cuenta',
        clase: 'crear_cuenta'
    });


};

module.exports.iniciarSesion = (req, res) => {

    const {error} = res.locals.mensajes

    res.render('iniciar_sesion', {
        titulo: 'Iniciar Sesion',
        clase: 'iniciar_sesion',
        error 
    });

};


module.exports.crearSesion = (req, res) => {

    res.json({
        body : req.body
    });

};


module.exports.guardarNuevoUsuario = async (req, res) => {

    let valores = req.body

    try {

        await Usuarios.create({ ...valores });
        
        res.json({ 
            estado : true ,
            data : null 
        });

    } catch (error) {
        console.log(error);
        let errores = error.errors.map( error => {

            if (error.type === 'unique violation') {
                return {"msg":"Nickname ya registrado"}
            }

            return {
                msg:error.message
            }
        });

        res.json({
            estado : false ,
            data :null ,
            mensajes :errores  
        });
    }

};