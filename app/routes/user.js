const express = require('express');
const router = express.Router();

//Controllers
const userController = require('../controllers/user');

//Middlewares
const validationsRegister = require('../middlewares/validateRegisterUser'); //Does it have to be a function? 
const uploadFile = require('../middlewares/multerUser'); //Does it have to be a function? 
const validationsLogin = require('../middlewares/validateLoginUser'); //Does it have to be a function? 

//Routes
router.get('/register', userController.retrieveRegister);

//Express-validator se usa después de multer para que también pueda validar la imagen
router.post('/register', uploadFile.single('avatar'), validationsRegister, userController.register);

router.get('/login', userController.retrieveLogin);

router.post('/login', validationsLogin, userController.login);

module.exports = router;