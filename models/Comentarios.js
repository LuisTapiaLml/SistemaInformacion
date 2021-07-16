const Sequelize = require('sequelize');
const db = require('../config/db');

const Comentarios = db.define('comentarios',{

    idcomentario: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true 
    },

    id_usuario :  Sequelize.INTEGER,

    id_curso : Sequelize.INTEGER,
    
    comentario : Sequelize.STRING,
    
    calificacion : Sequelize.TINYINT,

    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }

});




module.exports = Comentarios ;
