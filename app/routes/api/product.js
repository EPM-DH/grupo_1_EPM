const express = require('express');
const router = express.Router();

//Controllers
const productApiController = require('../../controllers/api/product');

//Middlewares
const authRoutes = require('../../middlewares/authRoutes'); 
const isAdmin = require('../../middlewares/isAdmin'); 

// To check if a product identifier is already being used
router.get('/identifier', authRoutes, isAdmin, productApiController.productIdentifier); //Sólo un usuario logeado y que sea administrador puede consultar si el identificador de un producto ya existe

// To retrieve the data from one product
router.get('/:id', productApiController.productDetail); //Cualquier usuario puede consultar el detalle de un producto

// To retrieve the products data
router.get('/', productApiController.allProducts); //Cualquier usuario puede consultar los productos que están registrados en la BD

module.exports = router;