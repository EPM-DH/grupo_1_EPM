const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); /* Bodyparser lo usaré para hacer el handling de los POST */
const urlencodedParser = bodyParser.urlencoded ({ extended: false }); /* url encoder lo uso para hacer strings los datos de los post */
const productController = require('../controllers/product');

/* CRUD Productos */

// To retrieve the products page
// Non existing 

// To retrieve the create products page
router.get('/create', productController.retrieveCreate);

// To retrieve product detail page
// Non existing

// To process the product creation 
// Non existing

// To retrieve the edit product page 
router.get('/edit/:id', productController.retrieveEdit);

// To process the product editing
router.put('/edit/:id', productController.update);

//To delete a product
// Non exisiting 

module.exports = router;