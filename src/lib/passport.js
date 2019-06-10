//SE DEFINEN LOS METODOS DE AUTENTICACION
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const db = require('../database');
const helpers = require('../lib/helpers');


passport.use('local.signin', new LocalStrategy({
    usernameField : 'UserName',
    passwordField : 'Password',
    passReqToCallback : true
}, async (request, username, password, done) => {
    const rows = await db.query('SELECT * FROM user WHERE UserName = ?', [username]);
    if(rows.length > 0) { //si encontro un usuario

        const user = rows[0];
        const validPassword = await helpers.MatchPassword(password, user.Password);
        
        console.log(validPassword);
        if(validPassword) { //si el password coincidio

            done(null, user, request.flash('success','Welcome ' + user.UserName));
        } else {
            done(null, false, request.flash('error', 'Incorrect password.'));
        }
    } else {
        return done(null, false, request.flash('error', 'The username does not exists.'));
    }

}));

passport.use('local.signup', new LocalStrategy({
    usernameField : 'UserName',
    passwordField : 'Password',
    passReqToCallback : true
}, async (request, username, password, done) =>{
    //Callback done.
    const { FullName } = request.body;
    //console.log(request.body);
    const new_user = {
        username,
        password,
        FullName
    };

new_user.password =  await helpers.Encrypt(new_user.password); //encripta el password brindado.

const result = await db.query('INSERT INTO user SET ?', [new_user]);
new_user.PK_IdUser = result.insertId; //agrega el id del usuario recien insertado al objeto 'new_user'
return done(null, new_user); //se devuelve el user para almacenarlo en una session.
}));



//Metodos propios de passport para serializar y desserializar un usaurio.
passport.serializeUser((user, done) =>{ //guarda el usuario dentro de la session
    done(null, user.PK_IdUser);
});

passport.deserializeUser( async (id, done) => { //deserializa el usuario dentro de la session
    const row = await db.query('SELECT * FROM USER WHERE PK_IdUser = ?', [id]);
    done(null, row[0]);
});

