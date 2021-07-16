const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//referencia al modelo 
const Usuarios = require('../models/Usuarios');

passport.use(
    new LocalStrategy( 
        {
           usernameField : 'nickname',
           passwordField : 'clave'
        },
        async (nickname , clave , done  ) => {
            try {

                const usuario = await Usuarios.findOne({
                    where:{ nickname }
                });

                if( !usuario.verificarPassword(clave)){
                    
                    console.log(usuario,'.....');
                    return done(null,null,{
                        message:'Nickname y/o Clave incorrecta'
                    });
                };
                
                return done(null,usuario );

            } catch (error) {
                console.log(error);

                return done(null,null,{
                    message:'nikcname no valido'
                });
            }
        }
    )
);

//serializar user
passport.serializeUser((usuario,callback) => {

   callback(null,usuario);

});

//dese

passport.deserializeUser(( usuario, callback) => {
    callback(null,usuario); 
});


module.exports = passport ;
