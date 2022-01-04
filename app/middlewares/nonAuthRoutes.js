const fs = require('fs');
const path = require('path');
// To import users
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); //Validate if users variable is empty before anything else

function nonAuthRoutes(req, res, next) {
    if(req.cookies.usuarioLogeado){

        let correo = req.cookies.usuarioLogeado;
        //Buscar datos del usuario
        for(user of users) { 
            if(user.email == correo) {
                res.redirect('/user/profile');        
            }
        }

        next();
    } else {
        next();
    }
}

module.exports = nonAuthRoutes;