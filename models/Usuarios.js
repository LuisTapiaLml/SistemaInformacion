const Sequelize = require('sequelize');
const db = require('../config/db');

const Comentarios = require('./Comentarios');
const Cursos = require('./Cursos');
const UsuariosCursos = require('./UsuariosCursos');

const Usuarios = db.define('usuarios', {

    idusuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nombre: Sequelize.STRING(30),
    primer_ap: Sequelize.STRING(30),
    segundo_ap: Sequelize.STRING(30),
    nickname: {
        type: Sequelize.STRING(30),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El nickname no puede ir vacio'
            }
        }
    },
    clave: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            len: {
                args: 6,
                msg: "La clave debe tener un minimo de 6 caracteres"
            }
        }
    },
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    }
}, {
    indexes: [
        {
            unique: true,
            fields: ['nickname']
        }
    ],
    // classMethods:{
    //     assosiate : function( models ) {
    //         Usuarios.hasMany(models.Cursos,{
    //             foreignKey : 'id_usuario'
    //         });

    //         Usuarios.hasMany( models.Comentarios,{
    //             foreignKey : 'id_usuario'
    //         });
    //     }
    // }

});

Usuarios.hasMany(Cursos, {
    foreignKey: 'id_usuario'
});

Usuarios.hasMany(Comentarios, {
    foreignKey: 'id_usuario'
});

Usuarios.hasMany(UsuariosCursos, { foreignKey: 'id_usuario' });

Usuarios.prototype.verificarPassword = function (clave) {

    return clave === this.clave
};

Cursos.belongsTo(Usuarios, { foreignKey: 'id_usuario' });
Cursos.hasMany(UsuariosCursos, { foreignKey: 'id_curso' });

Comentarios.belongsTo(Usuarios, { foreignKey: 'id_usuario' });

UsuariosCursos.belongsTo(Usuarios, { foreignKey: 'id_usuario' });
UsuariosCursos.belongsTo(Cursos, { foreignKey: 'id_curso' });

Comentarios.addHook('afterCreate', async (comentario, options) => {

    try {
        let promedio = await Comentarios.findOne({
            where: {
                id_curso: comentario.id_curso
            },
            attributes: [[Sequelize.fn('AVG', Sequelize.col('calificacion')), 'promedio']],
        });

        let curso =  await Cursos.findByPk(comentario.id_curso )

        if ( curso ){   
            
            let calificacion = promedio.dataValues.promedio;

            curso.calificacion = calificacion;

            await curso.save();

        }
       
    } catch (error) {
        console.log('hoook:', error);
    }
});

module.exports = Usuarios;
