//For express-validator
const { body } = require('express-validator'); //Body y check son lo mismo, pero es más semántico porque hace referencia a lo que recibes del body
//For the path
const path = require('path');

const validations = [
    body('name').notEmpty().withMessage('El nombre no puede estar vacío'),
    body('price').notEmpty().withMessage('El precio no puede estar vacío').bail()
        .isFloat().withMessage('El precio debe ser un número'),
    body('categories').notEmpty().withMessage('Se debe seleccionar al menos 1 categoría'),
    body('shortDescription').notEmpty().withMessage('La descripción corta no puede estar vacía'),
    body('longDescription').notEmpty().withMessage('La descripción larga no puede estar vacía'),
    body('characteristic1').notEmpty().withMessage('El producto debe contener al menos 1 característica'),
    body('rating').notEmpty().withMessage('La calificación no puede estar vacía').bail()
        .isInt({ min: 0, max: 5 }).withMessage('La calificación debe ser un número entero entre 0 y 5'),
    body('identifier').notEmpty().withMessage('El identificador no puede estar vacío'),
    body('imagenPrincipal').custom((value, { req }) => {
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