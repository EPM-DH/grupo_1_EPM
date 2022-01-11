const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');

router.get('/', cartController.getCart);

//To increase in 1 the product quantity from any page (product, home, details)
router.get('/add/:id', cartController.addItem);

//To increase in 1 the product quantity from the cart page
router.get('/increase/:id', cartController.increaseItem);

//To decrease in 1 the product quantity from the cart page
router.get('/decrease/:id', cartController.decreaseItem);

//To stop triggering the add guest cart items into user's shopping cart
router.get('/dismiss', cartController.dismiss);

//To add guest cart items into user's shopping cart
router.post('/include', cartController.include);

//To delete a cart element
router.delete('/delete/:id', cartController.delete); //Solamente un usuario logeado y que sea administrador puede eliminar un producto

module.exports = router;