const Usuarios = require('../models/Usuarios');

module.exports.crearUsuario = (req, res) => {

    res.render('crear_cuenta', {
        titulo: 'Crear Cuenta',
        clase: 'crear_cuenta'
    });


};

module.exports.iniciarSesion = (req, res) => {

    res.render('iniciar_sesion', {
        titulo: 'Iniciar Sesion',
        clase: 'iniciar_sesion'
    });

}

module.exports.guardarNuevoUsuario = async (req, res) => {

    let valores = req.body

    try {

        let usuario = await Usuarios.create({ ...valores })
        
        res.redirect('/iniciar_sesion')

    } catch (error) {

        res.json({
            estado : false ,
            data :null ,
            mensaje : error.errors
        });
    
    }

    


};