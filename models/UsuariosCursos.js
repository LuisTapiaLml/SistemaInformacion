const Sequelize = require('sequelize');

const db = require('../config/db');


const UsuariosCursos = db.define('usuarios_cursos',{

    idusuarios_curosos: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true 
    },
    id_usuario :  Sequelize.INTEGER,
    id_curso : Sequelize.INTEGER,
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
});


module.exports = UsuariosCursos ;

