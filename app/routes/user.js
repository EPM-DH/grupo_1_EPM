const express = require('express');
const router = express.Router();

//Controllers
const userController = require('../controllers/user');

//Middlewares
const validationsRegister = require('../middlewares/validateRegisterUser'); 
const validationsEdit = require('../middlewares/validateEditUser'); 
const uploadFile = require('../middlewares/multerUser'); 
const validationsLogin = require('../middlewares/validateLoginUser'); 
const nonAuthRoutes = require('../middlewares/nonAuthRoutes'); 
const authRoutes = require('../middlewares/authRoutes'); 
const isAdmin = require('../middlewares/isAdmin'); 

/* CRUD Usuarios */

// To retrieve the register page
router.get('/register', nonAuthRoutes, userController.retrieveRegister); //Solamente un usuario que no este logeado puede ver la página de registro de un usuario

// To process the user creation
//Express-validator se usa después de multer para que también pueda validar la imagen
router.post('/register', nonAuthRoutes, uploadFile.single('avatar'), validationsRegister, userController.register); //Solamente un usuario que no este logeado puede registrar a un usuario

// To retrieve the login page
router.get('/login', nonAuthRoutes, userController.retrieveLogin); //Solamente un usuario que no este logeado puede ver la página de login

// To process the user login
router.post('/login', nonAuthRoutes, validationsLogin, userController.login); //Solamente un usuario que no este logeado puede logearse

// To process the user logout
router.get('/logout', authRoutes, userController.logout); //Solamente un usuario que este logeado puede deslogearse

// To retrieve the user profile page
router.get('/profile', authRoutes, userController.profile); //Solamente un usuario que este logeado puede ver su perfil

// To process the user editing
router.put('/edit/:id', authRoutes, uploadFile.single('avatar'), validationsEdit, userController.update); //Solamente un usuario que este logeado puede editar su perfil

//To delete a user
router.delete('/delete/:id', authRoutes, userController.delete); //Solamente un usuario que este logeado puede eliminar su cuenta

// To retrieve the users rol editing dashboard
router.get('/manage', authRoutes, isAdmin, userController.retrieveMange); //Solamente un usuario logeado y que sea administrador puede manejar a los usuarios

// To process the rol editing
router.post('/updateRol/:id', authRoutes, isAdmin, userController.mange); //Solamente un usuario logeado y que sea administrador puede promover a administrador a un usuario

module.exports = router;