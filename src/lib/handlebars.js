//import {format, render, cancel, register} from 'timeago.js';
const {format} = require('timeago.js'); // obtenemos el metodo format de el modulo 'timeago.js'

const helpers = {};

helpers.timeago = (timestamp) => { //funcion que se tomara desde la vista, pasando como parametro un timestamp
     return format(timestamp);
};

module.exports = helpers;