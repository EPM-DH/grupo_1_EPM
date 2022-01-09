const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');

//Middlewares
const cartItems = require('../middlewares/cartItems'); 

router.get('/', cartItems, mainController.index); //Cualquiera puede ver entrar a la página principal 

module.exports = router;