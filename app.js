const path = require('path');
const express = require('express');
const cors = require('cors');
const db = require('./config/db');

const flash = require('connect-flash');

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

app.use(cors());

//rutas
const routes =  require('./routes');

//archivos estaticos
app.use(express.static('public'))

// view engine
app.set('view engine','pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(flash());

app.use('/', routes() );



app.listen(app.get('port'));
