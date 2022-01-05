const express = require('express');
const router = express.Router();
const mainController = require('../controllers/main');

router.get('/', mainController.index); //Cualquiera puede ver entrar a la página principal 

module.exports = router;