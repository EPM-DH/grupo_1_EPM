const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

//Middlewares
const authRoutes = require('../middlewares/authRoutes'); 

//To view the orders page
router.get('/', authRoutes, orderController.retrieveOrders); //Solamente un usuario que este logeado puede ver sus órdenes

module.exports = router;