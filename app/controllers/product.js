const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {
	retrieveCreate: (req, res) => {
		res.render('./products/createProduct');
	},
    retrieveEdit: (req, res) => {
		res.render('./products/editProduct');
	},
};

module.exports = productController;
