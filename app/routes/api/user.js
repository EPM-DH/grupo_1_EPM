const express = require('express');
const router = express.Router();

//Controllers
const userApiController = require('../../controllers/api/user');

// To retrieve the user email (if any)
router.get('/email', userApiController.email); //Cualquier usuario puede consultar si el email ya está registrado en la BD

module.exports = router;