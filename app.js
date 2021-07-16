const path = require('path');
const express = require('express');
const db = require('./config/db');
const flash = require('connect-flash');
const passport = require('./config/passport');
const routes =  require('./routes');
const session = require('express-session');
const cockieParser = require('cookie-parser');

require('./models/Cursos');
require('./models/Usuarios');
require('./models/Comentarios');
require('./models/UsuariosCursos');

db.sync()
    .then(()=> {
        console.log('conectado a db');
    }).catch(error => console.log(error));

const app =  express();

app.set('port', process.env.PORT || 80 );


app.use(cockieParser());

app.use( session({
    secret : 'zaXSgLrqkxAWvDrcVy',
    resave : false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use( ( req , res , next ) => {

    res.locals.mensajes = req.flash();
    res.locals.usuario = { ...req.user } || null
    res.locals.moment = require('moment');
    
    next();
});

//archivos estaticos
app.use(express.static('public'))

// view engine
app.set('view engine','pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', routes() );

app.listen(app.get('port'));
