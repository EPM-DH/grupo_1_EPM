const express = require('express');
const router = express.Router();

//Controllers
const productController = require('../controllers/product');

//Middlewares
const uploadFile = require('../middlewares/multerProduct'); 
const validationsRegister = require('../middlewares/validateRegisterProduct'); 
const validationsEdit = require('../middlewares/validateEditProduct'); 
const authRoutes = require('../middlewares/authRoutes'); 
const isAdmin = require('../middlewares/isAdmin'); 

/* CRUD Productos */

// To retrieve the products page
router.get('/', productController.retrieveProducts); //Cualquiera puede ver todos los productos

//Si bajo este y lo pongo debajo de create con post entra a /:id y me manda a retrieve product details por alguna razón
//??????????????????????????????????????????????????????
// To return to the previous page (cancel product create or edit)
router.get('/cancel', authRoutes, isAdmin, productController.cancel); //Solamente un usuario logeado y que sea administrador puede cancelar una creación de producto

// To retrieve the create products page
router.get('/create', authRoutes, isAdmin, productController.retrieveCreate); //Solamente un usuario logeado y que sea administrador puede ver la página de creación de productos

// To retrieve product detail page
router.get('/:id', productController.retrieveProductDetails); //Cualquiera puede ver el detalle de un producto

// To process the product creation 
router.post('/create', authRoutes, isAdmin, uploadFile.single('imagenPrincipal'), validationsRegister, productController.create); //Solamente un usuario logeado y que sea administrador puede crear un producto

// To retrieve the edit product page 
router.get('/edit/:id', authRoutes, isAdmin, productController.retrieveEdit); //Solamente un usuario logeado y que sea administrador puede ver la página de edición de productos

// To process the product editing
router.put('/edit/:id', authRoutes, isAdmin, uploadFile.single('imagenPrincipal'), validationsEdit, productController.update); //Solamente un usuario logeado y que sea administrador puede editar un producto

//To delete a product
router.delete('/delete/:id', authRoutes, isAdmin, productController.delete); //Solamente un usuario logeado y que sea administrador puede eliminar un producto

module.exports = router;