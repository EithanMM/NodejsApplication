//ALMACENARA TODAS LAS RUTAS PRINCIPALES DE LA APLICACION
const express = require('express');

const router = express.Router();
//Ruta de inicio.
router.get('/',(error, data) =>{
    (error == true) ? data.send('<h2>Ops, something went wrong.</h2>') : data.send('<h2>Hello everybody</h2>'); 
});

module.exports = router;