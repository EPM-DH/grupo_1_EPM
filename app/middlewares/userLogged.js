/*const fs = require('fs');
const path = require('path');
// To import users
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); //Validate if users variable is empty before anything else*/

//Models
const User = require('../models/User');

function userLogged (req, res, next) {
    //For session
    res.locals.isLogged = false; //res.locals puedo compartirlas a través de todas las vistas

    //For cookie part: persisting the session even if the browser is closed
    let emailInCookie = req.cookies.usuarioLogeado;
    let userFromCookie = User.findByField('email', emailInCookie);

    if(userFromCookie) { //Si hay un usuario en la DB que coincida con la cookie del navegador
        delete userFromCookie.password;
        req.session.userLogged = userFromCookie;
    }

    if(req.session.userLogged) {
        //Update user data in case a change in the profile is detected
        let usuario = User.findByField('email', req.session.userLogged.email);
        if(usuario) {
            delete usuario.password;
		    req.session.userLogged = usuario;
            
            //Indicate user is logged and save user data in local variable
            res.locals.isLogged = true; 
            res.locals.userLogged = req.session.userLogged;
        }
    }

    next();

    /*if(req.cookies.usuarioLogeado && !req.app.locals.logged) {
        let correo = req.cookies.usuarioLogeado;
        //Buscar datos del usuario
        for(user of users) { 
            if(user.email == correo) {
                //Guardar datos del usuario en variable local
                //req.app.logged = {nombre: user.firstName, imgPerfil: user.avatar, rol: user.rol, apellidos: user.lastName, email: user.email, id: user.id };
                //Reseteado cuando el servidor de express detecta un cambio
                req.app.locals.logged = {nombre: user.firstName, imgPerfil: user.avatar, rol: user.rol, apellidos: user.lastName, email: user.email, id: user.id }
            }
        }
    }
    next();*/
}

module.exports = userLogged;