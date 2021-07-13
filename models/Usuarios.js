const Sequelize = require('sequelize');

const db = require('../config/db');
const Cursos = require('./Cursos');
const Comentarios = require('./Comentarios');


const Usuarios = db.define('usuarios',{

    idusuario: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true 
    },

    nombre :  Sequelize.STRING(30),

    primer_ap : Sequelize.STRING(30),
    
    segundo_ap : Sequelize.STRING(30),
    
    nickname : {
        type : Sequelize.STRING(30),
        allowNull : false,
        unique : {
            args: true,
            msg : 'Usuario ya registrado'
        }
    },
    clave :{
        type : Sequelize.STRING(60),
        allowNull : false
    }
});


Usuarios.hasMany( Cursos );
Usuarios.hasMany( Comentarios );


module.exports = Usuarios ;
