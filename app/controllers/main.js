//Models
const Product = require('../models/Product');

const mainController = {
	index: (req, res) => {
		let productos = Product.findFeatured();
		
		let notification = '';

		if(req.app.notification){
			notification = req.app.notification;
		}

		res.render('home', {products: productos, notification});
	},
};

module.exports = mainController;
