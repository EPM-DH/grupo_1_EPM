//For express-validator
const { body } = require('express-validator'); //Body y check son lo mismo, pero es más semántico porque hace referencia a lo que recibes del body
//For the path
const path = require('path');

const validations = [
    body('nombre').notEmpty().withMessage('El nombre no puede estar vacío').bail()
        .isLength({ min: 2 }).withMessage('El nombre debe contener al menos 2 caracteres'),
    body('apellido').notEmpty().withMessage('El apellido no puede estar vacío').bail()
        .isLength({ min: 2 }).withMessage('El apellido debe contener al menos 2 caracteres'),
    body('email').notEmpty().withMessage('El email no puede estar vacío').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'), 
    body('contrasena').notEmpty().withMessage('La contraseña no puede estar vacía').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe ser de mínimo 8 caracteres').bail()
        .isStrongPassword().withMessage('La contraseña debe contener al menos 1 minúscula, 1 mayúscula, 1 número y 1 caracter especial'),
    body('confirmarcontrasena').notEmpty().withMessage('La confirmación de contraseña no puede estar vacía').bail()
        .custom((value, { req }) => {
            if (value !== req.body.contrasena){
                throw new Error('La confirmación de la contraseña no coincide con la contraseña');
            }

            return true;
        }),
    body('avatar').custom((value, { req }) => {
        /*let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        
        if(!file){
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);

            if(!acceptedExtensions.includes(fileExtension.toLowerCase())){
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }

        return true;*/
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
    body('checkPrivacidad').notEmpty().withMessage('Debe aceptar la declaración de privacidad para poder avanzar'),
];

module.exports = validations;