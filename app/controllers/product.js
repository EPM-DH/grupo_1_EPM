const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productController = {
	retrieveCreate: (req, res) => {
		res.render('./products/createProduct');
	},
    retrieveDetail: (req, res) => {
		const id = req.params.id
		let product = products.find(product => product.id == id)
		res.render('./products/detailProduct', {
			product
		})
	},
	retrieveEdit: (req, res) => {
		const id = req.params.id;
		let product = products.find(product => product.id == id);
		console.log(product);
		res.render('./products/editProduct', {
			product
		})
	},
	update: (req, res) =>{
		let id = req.params.id;
		let productToEdit = products.find(product => product.id == id)

		productToEdit = {
			id: productToEdit.id,
			...req.body,
			image: productToEdit.image,
			carouselImages: productToEdit.carouselImages
		};
		
		let newProducts = products.map(product => {
			if (product.id == productToEdit.id) {
				return product = {...productToEdit};
			}
			return product;
		})
		console.log(newProducts);
		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
		res.redirect('/');
	},
	store: (req, res) => {
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			vendidos: 0,
			toBuy: 0,
			image: 'default-image.png',
			carouselImages : ['default.jpg', 'default.jpg', 'default.jpg']
		};
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
	},
	destroy: (req, res) =>{
		let id = req.params.id;
		let newProductList = products.filter(product => product.id != id);
		fs.writeFileSync(productsFilePath, JSON.stringify(newProductList, null, ' '));
		res.redirect('/');
	}
};

module.exports = productController;
