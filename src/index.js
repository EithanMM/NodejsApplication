const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const path = require('path');

//INITIALIZATIONS
const app = express();

//SETTINGS
// se define un puerto, si existe un puerto, uselo, sino use el puerto 3000.
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views')); //especifica donde esta la carpeta views dentro de src.
//se configura un engine, para la usar las plantillas handlebars o cualquier otra (vistas).
app.engine('.hbs',handlebars({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), //une los directorios 'views' y 'layouts'.
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',//determino como reconocer las extensiones .handlebars
    helpers: require('./lib/handlebars')
}));

//aplica las configuraciones creadas anteriormente.
app.set('view engine', '.hbs');

//MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //sirve para aceptar los parametros que los usuarios envien a traves de los formularios.
app.use(express.json()); //permitira aceptar JSON.

//GLOBAL VARIBLES
//toma la info del usuario, toma lo que el servidor quiere responder y toma una funcion para continuar con el resto del codigo
app.use((request, response, next) =>{
    next();
});


//ROUTES
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links',require('./routes/links')); //el prefijo sirve para obtener las rutas especificas para agregar, modificar o eliminar links.

//PUBLIC
app.use(express.static(path.join(__dirname, 'public')));


//Starting the server
app.listen(app.get('port'),() =>{
    console.log('Server on port',app.get('port'));
})
