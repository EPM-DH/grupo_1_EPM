//For express-validator
const { body } = require('express-validator'); //Body y check son lo mismo, pero es más semántico porque hace referencia a lo que recibes del body

const validations = [
    body('nombreCompleto').notEmpty().withMessage('El nombre no puede estar vacío'),
    body('email').notEmpty().withMessage('El email no puede estar vacío').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('message').notEmpty().withMessage('El mensaje no puede estar vacío'),
];

module.exports = validations;