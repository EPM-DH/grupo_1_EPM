const express = require('express');
const router = express.Router();
const shoppingController = require('../controllers/shopping');

router.get('/', shoppingController.getCart);

//To increase in 1 the product quantity from any page (product, home, details)
router.get('/add/:id', shoppingController.addItem);

//To increase in 1 the product quantity from the cart page
router.get('/increase/:id', shoppingController.increaseItem);

//To decrease in 1 the product quantity from the cart page
router.get('/decrease/:id', shoppingController.decreaseItem);

//To stop triggering the add guest cart items into user's shopping cart
router.get('/dismiss', shoppingController.dismiss);

//To add guest cart items into user's shopping cart
router.post('/include', shoppingController.include);

//To delete a cart element
router.delete('/delete/:id', shoppingController.delete); //Solamente un usuario logeado y que sea administrador puede eliminar un producto

module.exports = router;