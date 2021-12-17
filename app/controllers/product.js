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
		res.render('./products/editProduct', {
			product
		})
	},
	update: (req, res) =>{
		const id = req.params.id
		let productToEdit = products.find(product => product.id == id);
		
		productToEdit ={
			...req.body,
			vendidos: productToEdit.vendidos,
			toBuy: productToEdit.toBuy
		}

		fs.writeFileSync(productsFilePath, JSON.stringify(productToEdit, null, ' '));
		res.redirect('/');
	},
	store: (req, res) => {
		console.log(req.body);
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			vendidos: 0,
			toBuy: 0,
			image: 'default-image.png'
		};
		console.log(newProduct);
		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
		res.redirect('/');
	},
	destroy: (req, res) =>{
		const id = req.params.id
		let newProductList = products.splice(id, 1);
		fs.writeFileSync(productsFilePath, JSON.stringify(newProductList, null, ' '));
		res.redirect('/');
	}
};

module.exports = productController;
