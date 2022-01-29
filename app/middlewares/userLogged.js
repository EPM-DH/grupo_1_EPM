/*const fs = require('fs');
const path = require('path');
// To import users
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); //Validate if users variable is empty before anything else*/

//Models for JSON
//const User = require('../models/User');

//MySQL
const db = require('../database/models');

function userLogged (req, res, next) {
    //For session
    res.locals.isLogged = false; //res.locals puedo compartirlas a través de todas las vistas

    //For cookie part: persisting the session even if the browser is closed
    let emailInCookie = req.cookies.usuarioLogeado;
    let email = undefined;

    if(req.session.userLogged){
        email = req.session.userLogged.email;
    } else if(emailInCookie) {
        email = emailInCookie;
    }

    if(email) {
        //Update user data in case a change in the profile is detected
        //JSON
        //let usuario = User.findByField('email', req.session.userLogged.email);
        //MySQL
        db.Usuario.findOne({ where: { email: email }, include: ['rol']})
        .then((usuario) => {
            if(usuario) {
                delete usuario.dataValues.password;
                usuario.dataValues.rol = usuario.rol.name;
                req.session.userLogged = usuario.dataValues;

                //Indicate user is logged and save user data in local variable
                res.locals.isLogged = true; 
                res.locals.userLogged = usuario.dataValues;
            }
            
        })
        .catch((err) => {
            console.log(err);
        });
        
    }

    next();
    
}

module.exports = userLogged;