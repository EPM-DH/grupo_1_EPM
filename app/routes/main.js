const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');

//Middlewares
const cartItems = require('../middlewares/cartItems'); 
const validationsContact = require('../middlewares/validateContact'); 

router.get('/', cartItems, mainController.index); //Cualquiera puede ver/entrar a la página principal 

// For contact page
router.get('/contact', mainController.retrieveContact); //Cualquiera puede ver/entrar a la página de contáctanos 

router.post('/contact', validationsContact, mainController.contact); //Cualquiera puede enviar un formulario de contáctanos 

// For about us page
router.get('/about', mainController.retrieveAbout); //Cualquiera puede ver/entrar a la página de contáctanos 

// For privacy declaration page
router.get('/privacy', mainController.retrievePrivacy); //Cualquiera puede ver/entrar a la página de contáctanos 

// For faq page
router.get('/faq', mainController.retrieveFaq); //Cualquiera puede ver/entrar a la página de contáctanos 

module.exports = router;