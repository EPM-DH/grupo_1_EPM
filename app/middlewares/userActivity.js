function userActivity (req, res, next) { //Refresco la cookie para que la sesión se mantenga activa
    if(req.cookies.usuarioLogeado){
        let userCookie = req.cookies.usuarioLogeado;
        res.cookie('usuarioLogeado', userCookie, { maxAge: (60 * 20) * 1000 }); // 20 min 
    }
    next();
}

module.exports = userActivity;