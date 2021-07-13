const multer = require('multer');
const {nanoid} = require('nanoid');

const { validationResult } = require('express-validator')

const Cursos = require('../models/Cursos');
const Comentarios = require('../models/Comentarios');

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



exports.cursosHome = ( req , res ) => {

    

    res.render('index',{
        titulo : 'Inicio',
        clase : 'inicio'
    });

};


exports.misCursos = async ( req , res ) => {

    try {
        const cursos = await Cursos.findAll()

        res.render('mis_cursos',{
            titulo : 'mis cursos',
            clase : 'mis_cursos',
            cursos
        });

    } catch (error) {
        console.log(error);
    }
};


exports.crearCurso = ( req , res ) => {

    res.render('crear_curso',{
        titulo : 'Crear Curso',
        clase : 'crearCurso'
    });


};

exports.guardarNuevoCurso = async ( req , res ) => {

    const errores = validationResult(req)

    let valores = req.body 

    if ( req.file ) {
        valores['imagen'] = req.file.filename;
    }

    const curso = await Cursos.create({...valores});
    
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

    let curso ; 

    if ( id ) {

        curso = await Cursos.findOne({
        
            where : {idcurso:id}
        
        });

        comentarios = await Comentarios.findAll({
            where : {id_curso : id}
        });


        if ( curso instanceof Cursos )  {

            res.render('curso',{
                titulo : 'Curso',
                clase : 'curso',

                curso : { 
                    nombre : curso.nombre , 
                    imagen:curso.imagen ,
                    calificacion : curso.calificacion,
                    usuario : curso.id_usuario ,
                    descripcion : curso.descripcion
                },

                comentarios : comentarios

            });

        }else{
        
            res.render('404',{
                titulo : '404',
                clase : 'not_found'
            });
        }

    }
};