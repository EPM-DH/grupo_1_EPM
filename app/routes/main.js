const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');

//Middlewares
const cartItems = require('../middlewares/cartItems'); 
const validationsContact = require('../middlewares/validateContact'); 

router.get('/', cartItems, mainController.index); //Cualquiera puede ver/entrar a la página principal 

router.get('/contact', mainController.retrieveContact); //Cualquiera puede ver/entrar a la página de contáctanos 

router.post('/contact', validationsContact, mainController.contact); //Cualquiera puede ver/entrar a la página de contáctanos 

module.exports = router;