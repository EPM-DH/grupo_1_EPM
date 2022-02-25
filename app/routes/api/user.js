const express = require('express');
const router = express.Router();

//Controllers
const userApiController = require('../../controllers/api/user');

//Middlewares
const authRoutes = require('../../middlewares/authRoutes'); 
const isAdmin = require('../../middlewares/isAdmin'); 

// To retrieve the user email (if any)
router.get('/email', userApiController.email); //Cualquier usuario puede consultar si el email ya está registrado en la BD

// To retrieve the data from one user
router.get('/:id', authRoutes, isAdmin, userApiController.userDetail); //Sólo un usuario que esté logeado y sea administrador puede consultar el detalle de un usuario

// To retrieve the users data
router.get('/', authRoutes, isAdmin, userApiController.allUsers); //Sólo un usuario que esté logeado y sea administrador puede consultar los demás usuarios que están registrados en la BD

module.exports = router;