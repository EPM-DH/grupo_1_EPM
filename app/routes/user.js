const express = require('express');
const router = express.Router();

//Controllers
const userController = require('../controllers/user');

//Middlewares
const validationsRegister = require('../middlewares/validateRegisterUser'); //Does it have to be a function? 
const validationsEdit = require('../middlewares/validateEditUser'); //Does it have to be a function? 
const uploadFile = require('../middlewares/multerUser'); //Does it have to be a function? 
const validationsLogin = require('../middlewares/validateLoginUser'); //Does it have to be a function? 
const nonAuthRoutes = require('../middlewares/nonAuthRoutes'); 
const authRoutes = require('../middlewares/authRoutes'); 

/* CRUD Usuarios */

// To retrieve the register page
router.get('/register', nonAuthRoutes, userController.retrieveRegister);

// To process the user creation
//Express-validator se usa después de multer para que también pueda validar la imagen
router.post('/register', nonAuthRoutes, uploadFile.single('avatar'), validationsRegister, userController.register);

// To retrieve the login page
router.get('/login', nonAuthRoutes, userController.retrieveLogin);

// To process the user login
router.post('/login', nonAuthRoutes, validationsLogin, userController.login);

// To process the user logout
router.get('/logout', authRoutes, userController.logout);

// To retrieve the user profile page
router.get('/profile', authRoutes, userController.profile);

// To process the user editing
router.put('/edit/:id', authRoutes, uploadFile.single('avatar'), validationsEdit, userController.update);

module.exports = router;