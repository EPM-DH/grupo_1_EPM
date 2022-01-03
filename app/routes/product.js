const express = require('express');
const router = express.Router();

//Controllers
const productController = require('../controllers/product');

//Middlewares
const uploadFile = require('../middlewares/multerProduct'); //Does it have to be a function? 
const validationsRegister = require('../middlewares/validateRegisterProduct'); //Does it have to be a function? 
const validationsEdit = require('../middlewares/validateEditProduct'); //Does it have to be a function?
const authRoutes = require('../middlewares/authRoutes'); 
const isAdmin = require('../middlewares/isAdmin'); 

/* CRUD Productos */

// To retrieve the products page
router.get('/', productController.retrieveProducts);

// To retrieve the create products page
router.get('/create', productController.retrieveCreate);

// To retrieve product detail page
router.get('/:id', productController.retrieveProductDetails);

// To process the product creation 
router.post('/create', authRoutes, isAdmin, uploadFile.single('imagenPrincipal'), validationsRegister, productController.create);

// To retrieve the edit product page 
router.get('/edit/:id', authRoutes, isAdmin, productController.retrieveEdit);

// To process the product editing
router.put('/edit/:id', authRoutes, isAdmin, uploadFile.single('imagenPrincipal'), validationsEdit, productController.update);

//To delete a product
router.delete('/delete/:id', authRoutes, isAdmin, productController.delete);

module.exports = router;