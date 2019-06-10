// ALMACENA TODAS LAS RUTAS NECESARIAS PARA LA AUTENTICACION, EJEMPLO LOGIN, LOGOUT
const express = require('express');
const db = require('../database');
const router = express.Router();

const passport = require('passport'); //requiero el archivo 'passport'
const { isLogedIn, isNotLogedIn } = require('../lib/sessionKeeper');

router.get('/signup', isNotLogedIn, (request, response) =>{
    response.render('signing/signup'); //renderizo la vista signup, que esta en la carpeta 'signing'
});

//RECIBE LA INFORMACION DE LA VISTA SIGNUP DE LA APLICACION
router.post('/signup', isNotLogedIn, passport.authenticate('local.signup', {
    successRedirect: '/profile', //si todo sale bien, active el get('/profile')
    failureRedirect: '/signup', //si ocurre un error active get('/signup')
    failureFlash: true //permite recibir mensajes flash
}));

router.get('/signin', isNotLogedIn, (request, response) =>{
    response.render('signing/signin'); //renderiza la vista signin.s
});

 //RECIBE LA INFORMACION PROVENIENTE DE LA VISTA DE SIGN IN DE LA APLICACION
router.post('/signin', isNotLogedIn, (request, response, next) => {

    passport.authenticate('local.signin', { //proceso de autenticacion
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(request, response, next); //pasan los objetos request, response y next

});

router.get('/profile', isLogedIn, (request, response) =>{
    response.render('profile');
});


router.get('/logout', isLogedIn, (request, response) =>{ //termina la sesion del usuario.
    request.logOut();
    response.redirect('/signin');
});

module.exports = router;