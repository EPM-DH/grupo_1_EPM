const fs = require('fs');
const path = require('path');
// To import users
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); //Validate if users variable is empty before anything else

function authRoutes(req, res, next) {
    if(!req.cookies.usuarioLogeado){
        res.redirect('/user/login');
    } else {
        let correo = req.cookies.usuarioLogeado;
        console.log("Hola");
        //Buscar datos del usuario
        for(user of users) { 
            if(user.email == correo) {
                console.log("adios");
                next();        
            }
        }
        
        res.redirect('/user/login');
    }
}

module.exports = authRoutes;