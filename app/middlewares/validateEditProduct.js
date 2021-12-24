//For express-validator
const { body } = require('express-validator'); //Body y check son lo mismo, pero es más semántico porque hace referencia a lo que recibes del body
//For the path
const path = require('path');

//Missing characteristics validation
const validations = [
    body('name').notEmpty().withMessage('El nombre no puede estar vacío'),
    body('price').notEmpty().withMessage('El precio no puede estar vacío').bail()
        .isNumeric().withMessage('El precio debe ser un número'),
    body('categories').notEmpty().withMessage('Se debe seleccionar al menos 1 categoría'),
    body('shortDescription').notEmpty().withMessage('La descripción corta no puede estar vacía'),
    body('longDescription').notEmpty().withMessage('La descripción larga no puede estar vacía'),
    body('identifier').notEmpty().withMessage('El identificador no puede estar vacío'),
    body('imagenPrincipal').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        
        if(file) {
            let fileExtension = path.extname(file.originalname);

            if(!acceptedExtensions.includes(fileExtension.toLowerCase()))
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        }

        return true;
    }),
];

module.exports = validations;