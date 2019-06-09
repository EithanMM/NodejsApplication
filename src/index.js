const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash'); //ocupa el modulo express-session
const session = require('express-session');
const MySQLStore = require('express-mysql-session'); //necesario en session
const passport = require('passport'); //requiero el modulo passport

const { database } = require('./keys');

//INITIALIZATIONS
const app = express();
require('./lib/passport'); //sirve para que la aplicacion se entere de la autenticacion que se esta realizando.

//SETTINGS

app.set('port', process.env.PORT || 3000); // se define un puerto, si existe un puerto, uselo, sino use el puerto 3000.
app.set('views',path.join(__dirname, 'views')); //especifica donde esta la carpeta views dentro de src. '__dirname' devuelve la direccion de la carpeta 'src'

//se configura un engine, para la usar las plantillas handlebars o cualquier otra (vistas).
app.engine('.hbs', handlebars({ //nombre del engine '.hbs'
    defaultLayout: 'main', //archivo .hbm que todas las vista compartiran.
    layoutsDir: path.join(app.get('views'), 'layouts'), // 'join' une los directorios 'views' y 'layouts'.
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',//determino como reconocer las extensiones .handlebars
    helpers: require('./lib/handlebars') //servira para el uso de  funciones helpers en las vistas.
}));

//aplica las configuraciones creadas anteriormente.
app.set('view engine', '.hbs');

//MIDDLEWARES
app.use(session({ //configuramos la session
    secret: 'thisisasecret',
    resave: false, //evita que se renueve la session
    saveUninitialized: false, //evita que se vuelva a establecer la session.
    store: new MySQLStore(database)//guarda la session en la base de datos. (necesita modulo express-mysql-session).
})); 
app.use(flash()); //uso de el modulo 'connect-flash' para mensajes.
app.use(morgan('dev')); //modulo que sirve para mostrar un determinado tipo de mensajes.
app.use(express.urlencoded({extended: false})); //sirve para aceptar los parametros que los usuarios envien a traves de los formularios.
app.use(express.json()); //permitira aceptar JSON.
app.use(passport.initialize()); //inicializando el modulo passport.
app.use(passport.session()) //inicializa una session para passport.




//GLOBAL VARIBLES

//toma la info del usuario, toma lo que el servidor quiere responder y toma una funcion para continuar con el resto del codigo
app.use((request, response, next) =>{
    app.locals.success = request.flash('success'); //Se almaceno un mensaje con el codigo 'succces' y lo va a hacer disponible en todas las vistas.
    next();
});


//ROUTES
app.use(require('./routes')); //aplicacion, use lo que voy a requerir desde la carpeta 'routes'.
app.use(require('./routes/authentication')); //aplicacion, use lo que voy a requerir de 'authentication'
app.use('/links',require('./routes/links')); //el prefijo sirve para obtener las rutas especificas para agregar, modificar o eliminar links.

//PUBLIC
app.use(express.static(path.join(__dirname, 'public')));


//Starting the server, -> Para ejecutar la aplicacion: 'npm run dev'
app.listen(app.get('port'),() =>{
    console.log('Server on port',app.get('port'));
})
