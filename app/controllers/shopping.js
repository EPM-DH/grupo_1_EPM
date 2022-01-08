const fs = require('fs');
const path = require('path');

//Models
const Product = require('../models/Product');

const cartFilePath = path.join(__dirname, '../data/carrito.json');
const cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));

const shoppingController = {
	getCart: (req, res) => {
        let breadcrumbList = ["Página de inicio", "Carrito"];
        let urlList = [""];
        urlList.push(req.originalUrl);

        let products = [];
        let index = 0;

        //To get the product information
        for(item of cart) {
            let productId = item.product_id;
            products.push(Product.findByPk(productId));
            products[index].quantity = cart[index].quantity;
            products[index].cartId = cart[index].id;
            index++;
        }

        let notification = '';

		if(req.app.notification){
			notification = req.app.notification;
		}

		res.render('cart', {notification, products, breadcrumbList, urlList});
	},
    addItem: (req, res) => {

    },
    delete: (req, res) => {
		let id = req.params.id;
		let finalCart = cart.filter(item => item.id != id); //Get all the cart that doesn't match with the given id

		let elemento = cart.find(item => item.id == id);
        let producto = Product.findByPk(elemento.product_id);
        
        fs.writeFileSync(cartFilePath, JSON.stringify(finalCart, null, ' '));

		//Notify user about cart item deletion
		let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "elemento del carrito", nombre: producto.name, tipo: "bg-danger"};

		req.app.notification = notification;

		res.redirect('/cart');
	},
};

module.exports = shoppingController;
