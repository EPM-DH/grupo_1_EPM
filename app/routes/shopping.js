const express = require('express');
const router = express.Router();
const shoppingController = require('../controllers/shopping');

router.get('/', shoppingController.getCart);

router.get('/add/:id', shoppingController.addItem);

//To stop triggering the add guest cart items into user's shopping cart
router.get('/dismiss', shoppingController.dismiss);

//To add guest cart items into user's shopping cart
router.post('/include', shoppingController.include);

//To delete a cart element
router.delete('/delete/:id', shoppingController.delete); //Solamente un usuario logeado y que sea administrador puede eliminar un producto

module.exports = router;