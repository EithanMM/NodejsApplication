//ALMACENA LA INFO NECESARIA PARA LA CONEXION A LA BD. (relacionada a el archivo keys.js)
const mysql = require('mysql');
const { database } = require('./keys');

//modulo para que la app soporte promesas.
const { promisify } = require('util');

//metodo que contiene una secuencia de hilos que se iran ejecutando secuancialmente.
const pool = mysql.createPool(database);

//obtiene la conecxion, puede obtener un error o un connection
pool.getConnection((error, connection)=> {
    if(error) {
        if(error.code === 'PROTOCOL_CONNECTION_LOST') { //perdio la conexion con el servidor.
            console.error('DATABASE CONNECTION WAS CLOSED'); 
        }
        if(error.code === 'ER_CON_COUNT_ERROR') { //Se excedio la cantidad de conexiones disponibles.
            console.error('DATABASE HAS TOO MANY CONNECTIONS');
        }
        if(error.code === 'ECONNREFUSED') { //conexion rechazada.
            console.error('DATABASE CONNECTION WAS REFUSED');
        }
    }

    if(connection) {
        connection.release();
        console.log('DB is connected.');
    }
    return;
});

pool.query = promisify(pool.query) //cada ves que se quiere hacer una consulta, se pueden utilizar promesas.

module.exports = pool;


