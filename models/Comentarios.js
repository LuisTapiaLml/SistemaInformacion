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

});

module.exports = Comentarios ;
