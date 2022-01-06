/* No need to refresh the cookie anymore. Session is not destroyed until logout or when browser is closed, then no need to refresh it anymore.
function userActivity (req, res, next) { //Refresco la cookie para que la sesión se mantenga activa
    if(req.cookies.usuarioLogeado){
        let userCookie = req.cookies.usuarioLogeado;
        let duracion = req.cookies.duracion;
        if(duracion == 20){
            res.cookie('usuarioLogeado', userCookie, { maxAge: (60 * 20) * 1000 }); // 20 min    
        } 
    }
    next();
}

module.exports = userActivity;
*/