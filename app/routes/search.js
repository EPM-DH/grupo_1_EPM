const express = require('express');
const router = express.Router();
const searchController = require('../controllers/search');

//router.get('/', searchController.retrieveSearch); //Cualquiera puede ver la página de búsqueda

router.post('/', searchController.search); //Cualquiera puede buscar un producto

module.exports = router;
