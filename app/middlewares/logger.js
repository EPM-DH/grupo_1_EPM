const fs = require('fs');
const path = require('path');

const loggerFilePath = path.join(__dirname, '../data/log.txt');

function logger (req, res, next) {
    let name = '';

    if(req.session.userLogged){
        name = req.session.userLogged.firstName + ' ' + req.session.userLogged.lastName;
    } else {
        name = 'Guest';
    }
    fs.appendFileSync(loggerFilePath, 'El usuario ' + name + ' ingresó en la ruta ' + req.url + '\n');

    next();
}

module.exports = logger;