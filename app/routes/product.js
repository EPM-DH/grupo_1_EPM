const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); /* Bodyparser lo usaré para hacer el handling de los POST */
const urlencodedParser = bodyParser.urlencoded ({ extended: false }); /* url encoder lo uso para hacer strings los datos de los post */
const productController = require('../controllers/product');

router.get('/create', productController.retrieveCreate);
router.post('/', productController.store); 

router.get('/edit/:id', productController.retrieveEdit);
router.put('/edit/:id', productController.update);

router.get('/detail/:id', productController.retrieveDetail); 

router.delete('/delete/:id', productController.destroy);

module.exports = router;