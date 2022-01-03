function isAdmin(req, res, next) {
    if(res.locals.logged.rol && res.locals.logged.rol == "administrador"){
        console.log("Admin authenticated");
        next();
    } else {
        res.redirect('/');
    }
}

module.exports = isAdmin;