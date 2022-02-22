const express = require('express');
const router = express.Router();

//Controllers
const userApiController = require('../../controllers/api/user');

// To retrieve the users data
router.get('/', userApiController.allUsers); //Cualquier usuario puede consultar los demás usuarios que están registrados en la BD
//Agregar seguridad?????????????????????????? 

// To retrieve the data from one user
router.get('/:id', userApiController.userDetail); //Cualquier usuario puede consultar el detalle de un usuario
//Agregar seguridad?????????????????????????? 

// To retrieve the user email (if any)
router.get('/email', userApiController.email); //Cualquier usuario puede consultar si el email ya está registrado en la BD

module.exports = router;