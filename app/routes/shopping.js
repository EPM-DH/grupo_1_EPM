const express = require('express');
const router = express.Router();
const shoppingController = require('../controllers/shopping');

router.get('/', shoppingController.getCart);

module.exports = router;