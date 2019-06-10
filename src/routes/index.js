//ALMACENARA TODAS LAS RUTAS PRINCIPALES DE LA APLICACION
const express = require('express');

const router = express.Router();
//Ruta de inicio.
router.get('/',(request, response) =>{ //se define una ruta inicial.
    response.render('index');
});

module.exports = router;