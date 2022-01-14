//For express-validator
const { body } = require('express-validator'); //Body y check son lo mismo, pero es más semántico porque hace referencia a lo que recibes del body

const validations = [
    body('name').notEmpty().withMessage('El nombre de la lista no puede estar vacío').bail()
        .isLength({ min: 3 }).withMessage('El nombre de la lista debe ser de al menos 3 caracteres')
];

module.exports = validations;