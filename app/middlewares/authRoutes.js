/*const fs = require('fs');
const path = require('path');
// To import users
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); //Validate if users variable is empty before anything else*/

//Si estoy tratando de entrar a una ruta que necesita login y no estoy logeado, entonces redirigo al usuario al login.
function authRoutes(req, res, next) {
    //For session
    if(!req.session.userLogged) { //Si nadie está logeado
        return res.redirect('/user/login'); //Redirigo al login
    }
    next();

    /*if(!req.cookies.usuarioLogeado){ //No estoy logeado
        res.redirect('/user/login'); //Redirigo al login
    } else { //Si estoy logeado, verifico que la cookie del usuario logeado sea real (existente)
        let correo = req.cookies.usuarioLogeado;
        //Buscar datos del usuario
        for(user of users) { 
            if(user.email == correo) { //Si existe, avanzo
                return next();        
            }
        }
        //Si no existe, redirigo al login
        res.redirect('/user/login');
    }*/
}

module.exports = authRoutes;