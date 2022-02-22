const express = require('express');
const router = express.Router();

//Controllers
const productApiController = require('../../controllers/api/product');

// To retrieve the products data
router.get('/', productApiController.allProducts); //Cualquier usuario puede consultar los productos que están registrados en la BD
//Agregar seguridad?????????????????????????? 

// To retrieve the data from one product
router.get('/:id', productApiController.productDetail); //Cualquier usuario puede consultar el detalle de un producto
//Agregar seguridad?????????????????????????? 

module.exports = router;