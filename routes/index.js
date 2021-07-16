const expres = require('express');
const cursos  = require('../controllers/cursosController');
const usuarios  = require('../controllers/usuariosController');
const multer = require('multer');
const upload = multer();
const router = expres.Router();
const authController = require('../controllers/authController');

module.exports = function (){

    router.get('/' , 
        cursos.cursosHome 
    );

    router.get(
        '/crear_usuario',
        usuarios.crearUsuario
    );

    router.post(
        '/crear_usuario',
        upload.none(),
        usuarios.guardarNuevoUsuario
    );

    router.get(
        '/iniciar_sesion',
        usuarios.iniciarSesion
    );

    router.post(
        '/iniciar_sesion',
        authController.autenticarUsuario
    );

    router.get(
        '/cerrar_sesion',
        authController.cerrarSession
    );

    router.get('/mis_cursos' , 
        authController.usuarioAutenticado,
        cursos.misCursos    
    );

    router.post(
        '/crear_curso',
        authController.usuarioAutenticado,
        cursos.subirImagen,
        cursos.guardarNuevoCurso
    );

    router.delete('/eliminar_curso/:id?' , 
        authController.usuarioAutenticado ,
        cursos.eliminarCurso
    );

    router.post('/inscribirse' , 
        authController.usuarioAutenticado ,
        upload.none(),
        cursos.inscribirse
    );

    router.post('/comentar' , 
        authController.usuarioAutenticado ,
        upload.none(),
        cursos.comentarCurso
    );

    // router.get('/perfil' ,
    //     authController.usuarioAutenticado, ( req , res ) => {
    //     res.render('perfil');
    // });

    router.get('/cursos/:id?' , cursos.getCursos );


    router.get('/mis_suscripciones',
        authController.usuarioAutenticado,
        cursos.misSuscripciones
    );

    return router

}