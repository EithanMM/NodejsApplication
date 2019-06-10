module.exports = {

    //metodo
    isLogedIn(request, response, next) {

        if(request.isAuthenticated()) {
            //si la sesion existe.
            return next(); //continue con el siguiente codigo.
        } else {
            response.redirect('/signin');
        }
    },

    isNotLogedIn(request, response, next) {
        if(!request.isAuthenticated()){
            return next();
        } else {
            return response.redirect('/profile');
        }
    }

}