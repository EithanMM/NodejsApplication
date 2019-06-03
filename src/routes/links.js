//ENCARGADO DE LAS RUTAS PARA PODER ALMACENAR, LISTAR, ELIMINAR 
const express = require('express');
const router = express.Router();
const db = require('../database');
 //-----------------METODOS GET-----------------------------------------------
//Cuando la app realice una peticion al servidor
router.get('/add', (request, response) => {
    response.render('links/add'); //renderizara la vista add.hbs
});

router.get('/modify', (request, response) => {
    response.render('links/modify'); //renderizara la vista modify.hbs
});

router.get('/delete', (request, response) => {
    response.render('links/delete'); //renderizara la vista delete.hbs
});

router.get('/list', (request, response) => {
    response.render('links/list'); //renderizara la vista list.hbs
});

router.get('/', async (request, response) =>{
    try {
        const res = await db.query('SELECT * FROM contact');
        response.render('links/list',{res}); //redirecciona a la vista list.hbs de la carpeta links, enviando 'res'.
    }catch(e){console.log(e);}
});


//--------------------------METODOS POST-------------------------------------
/* request.body => muestra el contenido de lo que se ha enviado en el formulario.
*/
router.post('/add', async (request, response) => { //async que 'await' funcione.
   //Destructuring
  /*(varaibles que recibe del request.body, tienen que ser del mismo nombre del 'name' de cada input).*/
  try {
   const {ContactName, Cellphone, Description} = request.body;

   //creamos un nuevo objeto 
   const new_object = {
    ContactName,
    Cellphone,
    Description
   };
   //peticion  de insercion asincrona.
    await db.query('INSERT INTO contact set ?' ,[new_object]); //
  } catch(e) {console.log(e);}
  
   response.redirect('/links'); //redirecciona a la vista 'links'.
})
//---------------------------------------------------------------------------
module.exports = router;