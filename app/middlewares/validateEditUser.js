//For express-validator
const { body } = require('express-validator'); //Body y check son lo mismo, pero es más semántico porque hace referencia a lo que recibes del body
//For the path
const path = require('path');

const validations = [
    body('nombre').notEmpty().withMessage('El nombre no puede estar vacío'),
    body('apellido').notEmpty().withMessage('El apellido no puede estar vacío'),
    body('email').notEmpty().withMessage('El email no puede estar vacío').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('contrasena')// if the new password is provided...
        .if((value, { req }) => req.body.contrasena)
        // ...then the old password must be too...
        .if(body('confirmarcontrasena').exists())
        // ...and they should not be empty
        .notEmpty().withMessage('Si deseas cambiar tu contraseña ingresa la nueva contraseña y su confirmación')
        // ...and they must be equal
        .custom((value, { req }) => {
            if (value !== req.body.contrasena){
                throw new Error('La confirmación de la contraseña no coincide con la contraseña');
            }

            return true;
        }),
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