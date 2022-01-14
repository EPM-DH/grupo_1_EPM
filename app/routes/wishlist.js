const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist');

//Middlewares
const authRoutes = require('../middlewares/authRoutes'); 

//To view the orders page
router.get('/', authRoutes, wishlistController.retrieveWishlist); //Solamente un usuario que este logeado puede ver sus órdenes

//To delete an item from a wishlist
router.delete('/delete/:id', authRoutes, wishlistController.deleteItem); //Solamente un usuario logeado puede eliminar un producto de una wishlist

//To delete a list from a wishlist
router.delete('/deleteList/:id', authRoutes, wishlistController.delete); //Solamente un usuario logeado puede eliminar una lista de una wishlist

module.exports = router;