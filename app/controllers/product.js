const fs = require('fs');
const path = require('path');

// To import products
const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); //Validate if products variable is empty before anything else

//To import categories
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

//Consider adding rating and featured field to products JSON 

const productController = {
	retrieveProducts: (req, res) => {
		res.render('./products/products', {products});
	},
	retrieveCreate: (req, res) => {
		res.render('./products/createProduct', {categories});
	},
	create: (req, res) => {
		let characteristics = [];
		//To get the value of each characteristic
		for (const [key, value] of Object.entries(req.body)) {
			if(key.includes('characteristic')) {
				characteristics.push(value);
			}
		};

		//Create new product from form data
		let newProduct = {
			id: products[products.length - 1].id + 1,
			name: req.body.name,
			price: req.body.price,
			categories: req.body.categories,
			shortDescription: req.body.shortDescription,
			longDescription: req.body.longDescription,
			characteristics: characteristics,
			identifier: req.body.identifier, //Validate if identifier is unique
			vendidos: 0,
			toBuy: 0,
			image: req.file.filename, 
			carouselImages: [req.file.filename, req.file.filename, req.file.filename], //Update in following sprints
		};

		//Add new product
		products.push(newProduct);

		//Write the new product to the JSON file
		fs.writeFileSync(productsFilePath, JSON.stringify(products));
		
		res.redirect('/'); //Products don't update until the page is reloaded 
	},
    retrieveEdit: (req, res) => {
		let id = req.params.id;
		let product = products.find(product => product.id == id);
		res.render('./products/editProduct', {product, categories});
	},
	update: (req, res) => {
		let id = req.params.id;
		let product = products.find(product => product.id == id);
		let characteristics = [];
		//To get the value of each characteristic
		for (const [key, value] of Object.entries(req.body)) {
			if(key.includes('characteristic')) {
				characteristics.push(value);
			}
		};

		//Create updated product from form data
		let newProduct = {
			id: id,
			name: req.body.name,
			price: req.body.price,
			categories: req.body.categories,
			shortDescription: req.body.shortDescription,
			longDescription: req.body.longDescription,
			characteristics: characteristics,
			identifier: req.body.identifier, //Validate if identifier is unique
			vendidos: product.vendidos,
			toBuy: product.toBuy,
			image: product.image, //To be obtained from multer
			carouselImages: product.carouselImages, //Update in following sprints
		};
		
		//Replace old product with updated one
		products[id - 1] = newProduct;

		//Write the new product to the JSON file
		fs.writeFileSync(productsFilePath, JSON.stringify(products));
		
		res.redirect('/'); //Products don't update until the page is reloaded 
	},
	delete: (req, res) => {
		let id = req.params.id;
		let finalProducts = products.filter(product => product.id != id); //Get all the products that don't match with the given id

		console.log(finalProducts);

		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts));
		res.redirect('/');
	},
};

module.exports = productController;
