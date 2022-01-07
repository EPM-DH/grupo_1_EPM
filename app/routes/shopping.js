const express = require('express');
const router = express.Router();
const shoppingController = require('../controllers/shopping');

router.get('/', shoppingController.getCart);

router.get('/add', shoppingController.addItem);

module.exports = router;