const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const cartFilePath = path.join(__dirname, '../data/carrito.json');
const cart = JSON.parse(fs.readFileSync(cartFilePath, 'utf-8'));

const shoppingController = {
	getCart: (req, res) => {
        let breadcrumbList = ["Página de inicio", "Carrito"];
        let urlList = [""];
        urlList.push(req.originalUrl);

        //To get the product information
        let poductId = cart;

		res.render('./cart', {products, breadcrumbList, urlList});
	},
    addItem: (req, res) => {

    },
};

module.exports = shoppingController;
