/*const fs = require('fs');
const path = require('path');
// To import users
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); //Validate if users variable is empty before anything else */

//Si estoy tratando de entrar a una ruta que no necesita login y estoy logeado, entonces redirigo al usuario a su perfil.
function nonAuthRoutes(req, res, next) {
    //For session
    if(req.session.userLogged) {
        return res.redirect('/user/profile');   
    }
    next();

    /*if(req.cookies.usuarioLogeado){ //Si estoy logeado

        let correo = req.cookies.usuarioLogeado;
        //Buscar datos del usuario
        for(user of users) { 
            if(user.email == correo) { //Busco al usuario logeado y redirigo a su perfil
                return res.redirect('/user/profile');        
            }
        }
    } 
    next();*/
}

module.exports = nonAuthRoutes;