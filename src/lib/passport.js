//SE DEFINEN LOS METODOS DE AUTENTICACION
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signup', new LocalStrategy({
    usernameField : 'FullName',
    passwordField : 'Password',
    passReqToCallback : true
}, async (request, username, password, done) =>{
    //Callback
    const { FullName } = request.body;
    //console.log(request.body);
    const new_user = {
        username,
        password,
        FullName
    };
new_user.password =  await helpers.Encrypt(new_user.password); //encripta el password brindado.
const result = await db.query('INSERT INTO user SET ?', [new_user]);
new_user.id = result.insertId; //agrega el id del usuario recien insertado al objeto 'new_user'
return done(null, new_user); //se devuelve el user para almacenarlo en una session.
}));

//Metodos propios de passport para serializar y desserializar un usaurio.
passport.serializeUser((user, done) =>{ //guarda el usuario dentro de la session
    done(null, user.id);
});

passport.deserializeUser( async (id, done) => { //deserializa el usuario dentro de la session
    const row = await db.query('SELECT * FROM USER WHERE PK_IdUser = ?', [id]);
    done(null, row[0]);
});

