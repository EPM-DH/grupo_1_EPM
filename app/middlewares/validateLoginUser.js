//For express-validator
const { body } = require('express-validator'); //Body y check son lo mismo, pero es más semántico porque hace referencia a lo que recibes del body
//For the path
const path = require('path');

const validations = [
    body('email').notEmpty().withMessage('El email no puede estar vacío').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('contrasena').notEmpty().withMessage('La contraseña no puede estar vacía').bail(),
];

module.exports = validations;