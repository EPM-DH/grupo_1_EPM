const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
	index: (req, res) => {
		let productos = products.filter(producto => producto.featured != 0);
		
		let notification = '';

		if(req.app.notification){
			notification = req.app.notification
		}

		res.render('home', {products: productos, notification});
	},
};

module.exports = mainController;
