const express = require('express');
const router = express.Router();

//Controllers
const orderApiController = require('../../controllers/api/order');

// To retrieve all the orders placed 
router.get('/', orderApiController.allOrders); //Cualquier usuario puede consultar la información de todas las ordenes (pedidos) hechas

module.exports = router;