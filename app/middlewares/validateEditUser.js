//For express-validator
const { body } = require('express-validator'); //Body y check son lo mismo, pero es más semántico porque hace referencia a lo que recibes del body
//For the path
const path = require('path');

const validations = [
    body('nombre').notEmpty().withMessage('El nombre no puede estar vacío'),
    body('apellido').notEmpty().withMessage('El apellido no puede estar vacío'),
    body('email').notEmpty().withMessage('El email no puede estar vacío').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('contrasena').optional({checkFalsy: true})
        .isLength({ min: 8 }).withMessage('La contraseña debe ser de mínimo 8 caracteres').bail() //Check its composition
        .isStrongPassword().withMessage('La contraseña debe contener al menos 1 minúscula, 1 mayúscula, 1 número y 1 caracter especial'),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        
        if(file) {
            let fileExtension = path.extname(file.originalname);

            if(!acceptedExtensions.includes(fileExtension.toLowerCase())){
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }

        return true;
    }),
];

module.exports = validations;