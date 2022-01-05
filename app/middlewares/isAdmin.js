function isAdmin(req, res, next) {
    if(req.app.locals.logged.rol && req.app.locals.logged.rol == "administrador"){
        console.log("Admin authenticated");
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = isAdmin;