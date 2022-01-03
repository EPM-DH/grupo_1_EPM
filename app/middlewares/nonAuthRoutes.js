function authRoutes(req, res, next) {
    if(req.cookies.usuarioLogeado){
        res.redirect('../user/profile');
    } else {
        next();
    }
}

module.exports = authRoutes;