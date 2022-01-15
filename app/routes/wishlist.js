const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlist');

//Middlewares
const authRoutes = require('../middlewares/authRoutes'); 
const validationsWishlist = require('../middlewares/validateWishlist'); 

//To view the wishlist page
router.get('/', authRoutes, wishlistController.retrieveWishlist); //Solamente un usuario que este logeado puede ver sus órdenes

// To process the new list creation 
router.post('/create/:id', authRoutes, validationsWishlist, wishlistController.create); //Solamente un usuario logeado puede crear una lista

//To add a product to a wishlist
router.get('/add/:id', authRoutes, wishlistController.addToWishlist); //Solamente un usuario que este logeado puede añadir elementos a su wishlist

// To process the list editing
router.put('/edit/:id', authRoutes, validationsWishlist, wishlistController.update); //Solamente un usuario logeado puede editar una lista

//To delete an item from a wishlist
router.delete('/delete/:id', authRoutes, wishlistController.deleteItem); //Solamente un usuario logeado puede eliminar un producto de una wishlist

//To delete a list from a wishlist
router.delete('/deleteList/:id', authRoutes, wishlistController.delete); //Solamente un usuario logeado puede eliminar una lista de una wishlist

module.exports = router;