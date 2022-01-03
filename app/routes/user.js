const express = require('express');
const router = express.Router();

//Controllers
const userController = require('../controllers/user');

//Middlewares
const validationsRegister = require('../middlewares/validateRegisterUser'); //Does it have to be a function? 
const uploadFile = require('../middlewares/multerUser'); //Does it have to be a function? 
const validationsLogin = require('../middlewares/validateLoginUser'); //Does it have to be a function? 
const nonAuthRoutes = require('../middlewares/nonAuthRoutes'); 
const authRoutes = require('../middlewares/authRoutes'); 

//Routes
router.get('/register', nonAuthRoutes, userController.retrieveRegister);

//Express-validator se usa después de multer para que también pueda validar la imagen
router.post('/register', nonAuthRoutes, uploadFile.single('avatar'), validationsRegister, userController.register);

router.get('/login', nonAuthRoutes, userController.retrieveLogin);

router.post('/login', nonAuthRoutes, validationsLogin, userController.login);

router.get('/logout', authRoutes, userController.logout);

router.get('/profile', authRoutes, userController.profile);

module.exports = router;