const express = require('express');
const router = express.Router();

//Controllers
const userController = require('../controllers/user');

//Middlewares
const validations = require('../middlewares/validateRegisterUser'); //Does it have to be a function? 
const uploadFile = require('../middlewares/multerUser'); //Does it have to be a function? 

//Routes
router.get('/register', userController.retrieveRegister);

//Express-validator se usa después de multer para que también pueda validar la imagen
router.post('/register', uploadFile.single('avatar'), validations, userController.register);

router.get('/login', userController.retrieveLogin);

module.exports = router;