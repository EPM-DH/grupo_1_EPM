const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); /* Bodyparser lo usaré para hacer el handling de los POST */
const urlencodedParser = bodyParser.urlencoded ({ extended: false }); /* url encoder lo uso para hacer strings los datos de los post */
const productController = require('../controllers/product');

router.get('/create', productController.retrieveCreate);

router.get('/edit', productController.retrieveEdit);

module.exports = router;