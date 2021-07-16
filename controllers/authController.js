const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local',{

    successRedirect: '/' ,
    failureRedirect : '/iniciar_sesion?estado=ssss',
    failureFlash : true,
    badRequestMessage :'Ambos campos son obligatorios'

});


exports.usuarioAutenticado = ( req , res , next ) => {

    if( req.isAuthenticated() ){
        return next();
    }

    return res.redirect('/iniciar_sesion');

};

exports.cerrarSession = ( req , res , next ) => {

    req.session.destroy(()=>[
        res.redirect('/')
    ]);

};