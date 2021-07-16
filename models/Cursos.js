const Sequelize = require('sequelize');
const db = require('../config/db');

const Comentarios = require('./Comentarios');


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
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }

},{
    indexes: [
        {
            unique: true,
            fields: ['id_usuario', 'nombre']
        }
    ]
});


Cursos.hasMany(Comentarios, { 
    foreignKey: 'id_curso'                   
});

Cursos.hasMany( Comentarios ,{
    foreignKey : 'id_curso'
});




module.exports = Cursos ;
