const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); /* Bodyparser lo usaré para hacer el handling de los POST */
const urlencodedParser = bodyParser.urlencoded ({ extended: false }); /* url encoder lo uso para hacer strings los datos de los post */
const userController = require('../controllers/user');

router.get('/register', userController.retrieveRegister);

router.post('/register', urlencodedParser, userController.register);

router.get('/login', userController.login);

module.exports = router;