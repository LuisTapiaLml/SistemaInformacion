const multer = require('multer');
const {nanoid} = require('nanoid');
const { Op } = require("sequelize");
const Sequelize = require("sequelize");
const { validationResult } = require('express-validator')

const Cursos = require('../models/Cursos');
const Usuarios = require('../models/Usuarios');
const Comentarios = require('../models/Comentarios');
const UsuariosCursos = require('../models/UsuariosCursos');

const configuracionMulter = {
    limits : { fileSize : 1500000  },
    storage: fileStorage = multer.diskStorage({

        destination : ( req , file , cb ) => {  

            cb(null,__dirname + '/../public/uploads/imagenes_cursos')
            
        },
        
        filename : ( req , file , cb ) => {

            const extension =  file.mimetype.split('/')[1]
            cb(null, `${nanoid()}.${extension}` );
        }  
    }),

    fileFilter( req, file , cb ){
        
        if( file.mimetype === 'image/jpeg' || file.mimetype==="image/jpg" || file.mimetype === 'image/png' ){
            cb(null,true);
        }else{
            cb(null,false);
        }
    },
    
}

const upload =  multer(configuracionMulter).single('imagen_curso');

exports.subirImagen =  ( req , res , next ) => {

    upload( req , res , function(error){
        
        if( error instanceof multer.MulterError ){
            next();
        }else{
            next();
        }

    });
    
};



exports.cursosHome =  async ( req , res ) => {

    
    try {
        // console.log(res.locals.usuario);

        const id_usuario = res.locals.usuario.idusuario || -1
        
        let cursos = await Cursos.findAll({
            // where :{
            //     [Op.not] :  { id_usuario }
            // },
            include: {
                model: Comentarios,
                attributes:['id_curso'], 
                required:false,
            },
            attributes: { 
                include: [[Sequelize.fn("COUNT", Sequelize.col("Comentarios.id_curso")), "cuenta_comentarios"]] 
            },
            group: ['id_curso'],

        }); 

        console.log(cursos );

        res.render('index',{
            titulo : 'Inicio',
            clase : 'inicio',
            usuario : res.locals.usuario,
            cursos 
        });


    } catch (error) {
        console.log(error);
        res.render('404');
    }


};


exports.misCursos = async ( req , res ) => {

    try {

        const {idusuario:id_usuario} = res.locals.usuario ;

        const cursos = await Cursos.findAll({
            where :{
                id_usuario 
            },
            include: {
                model: Comentarios,
                attributes:['id_curso']
            },
            attributes: { 
                include: [[Sequelize.fn("COUNT", Sequelize.col("Comentarios.id_curso")), "cuenta_comentarios"]] 
            },
            group: ['id_curso']
        });

        

        res.render('mis_cursos',{
            titulo : 'mis cursos',
            clase : 'mis_cursos',
            cursos,
            usuario : res.locals.usuario
        });

    } catch (error) {
        console.log(error);
    }
};


exports.crearCurso = ( req , res ) => {

    res.render('crear_curso',{
        titulo : 'Crear Curso',
        clase : 'crearCurso',
        usuario : res.locals.usuario
    });


};

exports.guardarNuevoCurso = async ( req , res ) => {

    const errores = validationResult(req)

    let valores = req.body 

    if ( req.file ) {
        valores['imagen'] = req.file.filename;
    }

    const curso = await Cursos.create({...valores,id_usuario:res.locals.usuario.idusuario});
    
    respuesta  = { 
        estado : false,
        mensaje : 'Hubo un error'
    }

    if( curso instanceof Cursos ){
        respuesta = {
            estado : true ,
            mensaje : 'El curso se creo con exito',
            data : {
                ...curso.dataValues
            }
        }

    }

    res.json( respuesta );

};


module.exports.getCursos =  async ( req , res ) => {
    
    const {id }  = req.params ;

    const idusuariosesion = res.locals.usuario.idusuario || 0

    if ( id ) {
        try {
            let curso = await Cursos.findOne({
                where :{
                    idcurso :id 
                },
                order: [
                    [Comentarios,'idcomentario', 'DESC'],
                ],
                include: [{
                    model: Comentarios,
                    required:false,
                    attributes : ['comentario','created_at','calificacion','idcomentario'],
                    include :{
                        model : Usuarios,
                        attributes : ['nickname']
                    },
                }
                ,{
                    model : UsuariosCursos,
                    required:false,
                }],
                
            });

            curso['inscrito'] =curso.usuarios_cursos.find( alumno => (alumno.id_usuario === idusuariosesion) ) || false;

            if( curso ){
                res.render('curso',{
                    titulo : 'Curso',
                    clase : 'curso',
                    usuario : res.locals.usuario,
                    curso : curso
                });
            }else{
                res.render('404',{
                    titulo : '404',
                    clase : 'not_found',
                    usuario : res.locals.usuario
                });
            }

            
    
        } catch (error) {
            console.log(error);
            res.render('404',{
                titulo : '404',
                clase : 'not_found',
                usuario : res.locals.usuario
            });
        }
    }
};


module.exports.comentarCurso = async ( req , res ) => {

    try {
    
        const { comentario , calificacion , id_curso } = req.body; 
        const { idusuario } = res.locals.usuario;
        
        const comentarios = await Comentarios.create({id_usuario :  idusuario ,id_curso, comentario , calificacion });

        if( comentarios ) {
            res.json({

                estado : true ,
                mensaje : 'Curso calificado con exito',
                data:  comentarios 
            
            });
        }else{
            res.json({
                estado : false ,
                mensaje : 'No se pudo comentar curso',
                data:  null 
            });
        }
        
    } catch (error) {
        console.log(error);
        
        res.json({
            estado : false ,
            mensaje : 'No se pudo comentar curso',
            data:  null 
        });
    }

};


module.exports.eliminarCurso = async ( req, res ) => {

    try {
        
        const {id }  = req.params ;
        const { idusuario:id_usuario} = res.locals.usuario

        const curso = await Cursos.findOne({
            where:{
                idcurso : id ,
                id_usuario 
            }
        });

        const borrado = await Cursos.destroy({
            where : {
                idcurso : curso.idcurso
            }
        });

        if( borrado ){
            res.json({
                estado : true,
                mensaje :'El curso se elimino de manera correcta',
                data :null
            });
        }else{
            res.json({
                estado : false,
                mensaje :'No se pudo eliminar curso',
                data :null
            });
        }
        
    } catch (error) {
        console.log(error);
        
        res.json({
            estado : false,
            mensaje :'No se pudo eliminar curso',
            data :null
        });
    }

};

module.exports.inscribirse = async ( req , res ) => {

    try {
        const { id_curso } = req.body;

        console.log(req.body);
    
        const { idusuario:id_usuario } = res.locals.usuario;

        const inscripcion = await UsuariosCursos.create({id_usuario,id_curso});

        if( inscripcion ){
            res.json({
                estado : true,
                mensaje :'Ud se suscribio con éxito.',
                data : inscripcion
            });
        }
       
    } catch (error) {
        console.log(error);    
        
        res.json({
            estado : false,
            mensaje :'No se pudo generar inscripcion',
            data :null
        });
    }
};


module.exports.misSuscripciones= async ( req ,res ) => {

    try {
        let id_usuario = res.locals.usuario.idusuario || 0 ;

        let mis_suscripciones = await   Cursos.findAll({
            include : [{
                model: UsuariosCursos,
                where : {
                    id_usuario 
                }
            }]
        });

        res.render('mis_suscripciones',{
            titulo : 'Mis Suscripciones',
            clase : 'mis_Suscripciones',
            usuario : res.locals.usuario,
            mis_suscripciones
        });

    } catch (error) {
        console.log(error);

        res.render('404',{
            titulo : '404',
            clase : 'not_found',
            usuario : res.locals.usuario
        });
    }

};