const fs = require('fs');
const path = require('path');

//Models
const Product = require('../models/Product');
const Cart = require('../models/Cart');

const shoppingController = {
	getCart: (req, res) => {
        let breadcrumbList = ["Página de inicio", "Carrito"];
        let urlList = [""];
        urlList.push(req.originalUrl);

        let products = [];
        let index = 0;
        let cart = Cart.findAll();

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
        let productId = parseInt(req.params.id);

        let currentItem = Cart.findByField('product_id', productId);
        let productName = Product.findByPk(productId).name;
        let referer = req.headers.referer;
        let parts = referer.split('/');
        let location = parts.pop();

        if(currentItem) {
            currentItem.quantity = currentItem.quantity + 1;
            //Update data
        } else {
            let newItem = {
                product_id: productId,
                quantity: 1,
            };
            Cart.create(newItem);
        }

        //Notify user about new product creation
        let notification = {activo: 1, accion: "agregación", accionDos: "añadido", elemento: "producto al carrito", nombre: productName, tipo: "bg-success"};

        req.app.notification = notification;

        if(location == '') {
            res.redirect('/');
        } else {
            res.redirect('/' + location);
        }
    },
    delete: (req, res) => {
		let id = parseInt(req.params.id);

        let elemento = Cart.findByPk(id);
        let producto = Product.findByPk(elemento.product_id);

		Cart.delete(id);

		//Notify user about cart item deletion
		let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "elemento del carrito", nombre: producto.name, tipo: "bg-danger"};

		req.app.notification = notification;

		res.redirect('/cart');
	},
};

module.exports = shoppingController;
