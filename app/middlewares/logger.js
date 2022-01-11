const fs = require('fs');
const path = require('path');

const loggerFilePath = path.join(__dirname, '../data/log.txt');

function logger (req, res, next) {
    fs.appendFileSync(loggerFilePath, 'El usuario ' + req.session.userLogged.firstName + ' ' + req.session.userLogged.lastName + ' ingresó en la ruta ' + req.url + '\n');

    next();
}

module.exports = logger;