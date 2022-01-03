const fs = require('fs');
const path = require('path');
// To import users
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); //Validate if users variable is empty before anything else

function userLogged (req, res, next) {
    if(req.cookies.usuarioLogeado) {
        let correo = req.cookies.usuarioLogeado;
        //Buscar datos del usuario
        for(user of users) { 
            if(user.email == correo) {
                //Guardar datos del usuario en variable local
                res.locals.logged = {nombre: user.firstName, imgPerfil: user.avatar, rol: user.rol, apellidos: user.lastName, email: user.email, id: user.id };
            }
        }
    }
    next();
}

module.exports = userLogged;