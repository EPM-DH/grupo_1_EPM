function isAdmin(req, res, next) {
    //For session
    if(req.session.userLogged && req.session.userLogged.rol == "administrador"){
        console.log("Admin authenticated");
        next();
    } else {
        res.redirect('/');
    }

    /*if(req.app.locals.logged.rol && req.app.locals.logged.rol == "administrador"){
        console.log("Admin authenticated");
        next();
    } else {
        res.redirect('/');
    }*/
}

module.exports = isAdmin;