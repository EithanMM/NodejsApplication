//ENCARGADO DE LAS RUTAS PARA PODER ALMACENAR, LISTAR, ELIMINAR 
const express = require('express');
const router = express.Router();
const db = require('../database');
const { isLogedIn } = require('../lib/sessionKeeper'); //funcion para proteger nuestras rutas.
 //-----------------METODOS GET y POST -----------------------------------------------
//Cuando la app realice una peticion al servidor
router.get('/add', isLogedIn, (request, response) => {
    response.render('links/add'); //renderizara la vista add.hbs
});

router.post('/add', isLogedIn, async (request, response) => { //async que 'await' funcione.
   //Destructuring
  /*(varaibles que recibe del request.body, tienen que ser del mismo nombre del 'name' de cada input).*/
  try {
   const {ContactName, Cellphone, Description} = request.body;

   //creamos un nuevo objeto 
   const new_object = {
    FK_User: request.user.PK_IdUser,
    ContactName,
    Cellphone,
    Description
   };
   //peticion  de insercion asincrona.
    await db.query('INSERT INTO contact set ?' ,[new_object]); //inserta un contacto en la BD.
    request.flash('success', 'Contact added succesfully!');
  } catch(e) {console.log(e);}
  
   response.redirect('/links'); //redirecciona a la vista 'links'.
})

router.get('/modify/:id', isLogedIn, async (request, response) => {
    const { id } = request.params;
    const con = await db.query('SELECT * FROM contact WHERE PK_IdContact = ?', [id]);
    console.log(con[0]);
    response.render('links/modify', { contact: con[0]  }); //pasara una propiedad 'contact' que tendra el la info del contacto.
    //response.redirect('links/modify'); //renderizara la vista modify.hbs
});

router.post('/modify/:id', isLogedIn, async (request, response) =>{
    try{
        const {id} = request.params;
        const {ContactName, Cellphone, Description} = request.body; 

        const new_object = {
            ContactName,
            Cellphone,
            Description
        }

        await db.query('UPDATE contact set ? WHERE PK_IdContact = ?', [new_object, id]);
        request.flash('success', 'Contact updated succesfully!');
        response.redirect('/links');

    }catch(e){console.log(e);}
});

router.get('/delete/:id', isLogedIn, async (request, response) => {
    console.log(request.params.id); //sirve para verificar si el parametro id se esta enviando correcamente.
    const { id } = request.params;
     await db.query('DELETE FROM contact WHERE PK_IdContact = ?',[id]);
     request.flash('success', 'Contact deleted succesfully!');
     response.redirect('/links'); 
});

router.get('/list', isLogedIn, (request, response) => {
    response.render('links/list'); //renderizara la vista list.hbs
});

router.get('/', isLogedIn, async (request, response) =>{ //OBTIENE TODOS LOS ENLACES.
    try {
        const res = await db.query('SELECT * FROM contact WHERE FK_USER = ?', [request.user.PK_IdUser]);
        response.render('links/list',{res}); //redirecciona a la vista list.hbs de la carpeta links, enviando 'res'.
    }catch(e){console.log(e);}
});

//--------------------------------------------------------------------------------------
module.exports = router;