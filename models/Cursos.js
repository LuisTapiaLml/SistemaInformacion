const Sequelize = require('sequelize');

const db = require('../config/db');


const Cursos = db.define('cursos',{

    idcurso: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true 
    },

    id_usuario : Sequelize.INTEGER,

    nombre: Sequelize.STRING,

    calificacion: {
        type:Sequelize.FLOAT,
        defaultValue : 0
    },

    imagen :  Sequelize.STRING,

    descripcion : Sequelize.STRING,

},{
    indexes: [
        {
            unique: true,
            fields: ['id_usuario', 'nombre']
        }
    ]
});

module.exports = Cursos ;
