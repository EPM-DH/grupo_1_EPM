const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist');

//Middlewares
const authRoutes = require('../middlewares/authRoutes'); 

//To view the orders page
router.get('/:id', authRoutes, wishlistController.retrieveWishlist); //Solamente un usuario que este logeado puede ver sus órdenes

module.exports = router;