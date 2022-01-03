function authRoutes(req, res, next) {
    if(!req.cookies.usuarioLogeado){
        res.redirect('../user/login');
    } else {
        next();
    }
}

module.exports = authRoutes;