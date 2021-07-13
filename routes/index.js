const expres = require('express');
const  cursos  = require('../controllers/cursosController');

const  usuarios  = require('../controllers/usuariosController');

const multer = require('multer');
const upload = multer();

const { body } = require('express-validator');

const router = expres.Router();


module.exports = function (){

    router.get('/' , cursos.cursosHome );


    router.get('/mis_cursos' , cursos.misCursos);

    router.post(
        '/crear_curso',
        cursos.subirImagen,
        cursos.guardarNuevoCurso
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


    router.get('/perfil' , ( req , res ) => {
        res.render('perfil');
    });

    router.get('/cursos/:id?' , cursos.getCursos );

    
    // router.delete('/nuevoCurso',cursos.nuevoCurso);
    // router.post('/guardarCurso' , cursos.cursosHome );

    router.get('/mis_suscripciones',( req , res ) => {
        res.render('mis_suscripciones');
    });

    return router

}