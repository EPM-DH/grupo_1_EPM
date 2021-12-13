const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const shoppingController = {
	getCart: (req, res) => {
		res.render('./shoppingCart', {products});
	},
};

module.exports = shoppingController;
