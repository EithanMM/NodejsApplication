// ALMACENA TODAS LAS RUTAS NECESARIAS PARA LA AUTENTICACION, EJEMPLO LOGIN, LOGOUT
const express = require('express');
const db = require('../database');
const router = express.Router();

const passport = require('passport'); //requiero el archivo 'passport'

router.get('/signup', (request, response) =>{
    response.render('signing/signup'); //renderizo el archivo signup, que esta en la carpeta 'signing'
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile', //si todo sale bien, active el get('/profile')
    failureRedirect: '/signup', //si ocurre un error active get('/signup')
    failureFlash: true //permite recibir mensajes flash
}));

router.get('/profile', (request, response) =>{
    response.send('profile');
});
module.exports = router;