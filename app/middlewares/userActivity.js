//Only required when working with JSON files. Because each time a new user is created, updated or deleted. There is a change in the server
//causing it to restart (because we are using nodemon). Hence, loosing the session

//Models
const User = require('../models/User');

function userActivity (req, res, next) { //Refresco la sesión para que se mantenga activa
    //For cookies
    /*if(req.session.userLogged){
        let userCookie = req.cookies.usuarioLogeado;
        let duracion = req.cookies.duracion;
        if(duracion == 20){
            res.cookie('usuarioLogeado', userCookie, { maxAge: (60 * 20) * 1000 }); // 20 min    
        } 
    }
    next();*/

    //For keeping the session when server is restarted due to nodemon and JSON files
    if(req.cookies.active){
        let usuario = User.findByField('email', req.cookies.active);
        if(usuario) {
            delete usuario.password;
		    req.session.userLogged = usuario;
        }
    }
    next();
}

module.exports = userActivity;