const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
//For the path
const path = require('path');
//For multer 
const multer = require('multer');
//For express-validator
const { body } = require('express-validator'); //Body y check son lo mismo, pero es más semántico porque hace referencia a lo que recibes del body

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/../public/img/users'));
    },
    filename: (req, file, cb) => {
        //Remove all whitespaces between words
        cb(null, `${path.parse(file.originalname).name.replace(/ +/g, "")}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadFile = multer({storage});

const validations = [
    body('nombre').notEmpty().withMessage('El nombre no puede estar vacío'),
    body('apellido').notEmpty().withMessage('El apellido no puede estar vacío'),
    body('email').notEmpty().withMessage('El email no puede estar vacío').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('contrasena').notEmpty().withMessage('La contraseña no puede estar vacía').bail()
        .isLength({ min: 8 }).withMessage('La contraseña debe ser de mínimo 8 caracteres').bail()
        .isStrongPassword().withMessage('La contraseña debe contener al menos 1 minúscula, 1 mayúscula, 1 número y 1 caracter especial'),
    body('confirmarcontrasena').notEmpty().withMessage('La confirmación de contraseña no puede estar vacía').bail()
        .custom((value, { req }) => {
            if (value !== req.body.contrasena) 
                throw new Error('La confirmación de la contraseña no coincide con la contraseña');

            return true;
        }),
    body('avatar').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        
        if(!file)
            throw new Error('Tienes que subir una imagen');
        else {
            let fileExtension = path.extname(file.originalname);

            if(!acceptedExtensions.includes(fileExtension.toLowerCase()))
                throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
        }

        return true;
    }),
    body('checkPrivacidad').notEmpty().withMessage('Debe aceptar la declaración de privacidad para poder avanzar'),
];

router.get('/register', userController.retrieveRegister);

//Express-validator se usa después de multer para que también pueda validar la imagen
router.post('/register', uploadFile.single('avatar'), validations, userController.register);

router.get('/login', userController.retrieveLogin);

module.exports = router;