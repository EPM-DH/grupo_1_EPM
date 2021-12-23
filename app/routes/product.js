const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
//For the path
const path = require('path');
//For multer 
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/../public/img/products'));
    },
    filename: (req, file, cb) => {
        //Remove all whitespaces between words
        cb(null, `${path.parse(file.originalname).name.replace(/ +/g, "")}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const uploadFile = multer({storage});

/* CRUD Productos */

// To retrieve the products page
router.get('/', productController.retrieveProducts);

// To retrieve the create products page
router.get('/create', productController.retrieveCreate);

// To retrieve product detail page
router.get('/:id', productController.retrieveProductDetails);

// To process the product creation 
router.post('/create', uploadFile.single('imagenPrincipal'), productController.create);

// To retrieve the edit product page 
router.get('/edit/:id', productController.retrieveEdit);

// To process the product editing
router.put('/edit/:id', uploadFile.single('imagenPrincipal'), productController.update);

//To delete a product
router.delete('/delete/:id', productController.delete);

module.exports = router;