const fs = require('fs');
const path = require('path');

// To import products
const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8')); //Validate if products variable is empty before anything else

//To import categories
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const { validationResult } = require('express-validator');

//Consider adding rating field to products JSON 

const productController = {
	retrieveProducts: (req, res) => {
		res.render('./products/products', {products});
	},
	retrieveCreate: (req, res) => {
		res.render('./products/createProduct', {categories});
	},
	retrieveProductDetails: (req, res) => {
		let id = req.params.id;
		let product = products.find(product => product.id == id);
		let breadcrumbList = ["Página de inicio", "Productos", product.name];
        let urlList = [""];
        urlList.push(req.baseUrl);
		
		res.render('./products/productDetails', {product, breadcrumbList, urlList});
	},
	create: (req, res) => {
		const errors = validationResult(req);

		if(errors.isEmpty()){ //No hay errores
			let characteristics = [];
			let featured = 0;
			//To get the value of each characteristic
			for (const [key, value] of Object.entries(req.body)) {
				if(key.includes('characteristic')) {
					characteristics.push(value);
				}
			};
			//To see if a product is featured
			if(req.body.featured == 'on')
				featured = 1;

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
				featured: featured,
				image: req.file.filename, 
				carouselImages: [req.file.filename, req.file.filename, req.file.filename], //Update in following sprints
			};

			//Add new product
			products.push(newProduct);

			//Write the new product to the JSON file
			fs.writeFileSync(productsFilePath, JSON.stringify(products));
			
			res.redirect('/'); //Products don't update until the page is reloaded 

		} else { //Hay errores
			//Destroy image saved by multer
			if(req.file){
				fs.unlinkSync(path.join(__dirname, '/../public/img/products', req.file.filename), (err) => {
					if (err) {
						console.error(err)
						return
					}
				
					console.log('File removed successfully');
				});
			}

			if(!Array.isArray(req.body.categories))
				req.body.categories = [req.body.categories];

			res.render('products/createProduct', { errors: errors.mapped() , old: req.body, categories }); //Mapped convierte el arreglo en un objeto literal
			//Donde en lugar de índices tiene los nombres de los inputs del formulario
		}
		
	},
    retrieveEdit: (req, res) => {
		let id = req.params.id;
		let product = products.find(product => product.id == id);
		res.render('./products/editProduct', {product, categories});
	},
	update: (req, res) => {
		const errors = validationResult(req);

		if(errors.isEmpty()){ //No hay errores
			let id = req.params.id;
			let product = products.find(product => product.id == id);
			let characteristics = [];
			let imagen;
			let featured = 0;
			//To get the value of each characteristic
			for (const [key, value] of Object.entries(req.body)) {
				if(key.includes('characteristic')) {
					characteristics.push(value);
				}
			};

			//To see if a product is featured
			if(req.body.featured == 'on')
				featured = 1;

			if(req.file == undefined)
				imagen = product.image;
			else
				imagen = req.file.filename;

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
				featured: featured,
				image: imagen, //To be obtained from multer
				carouselImages: product.carouselImages, //Update in following sprints
			};
			
			//Replace old product with updated one
			products[id - 1] = newProduct;

			//Write the new product to the JSON file
			fs.writeFileSync(productsFilePath, JSON.stringify(products));
			
			res.redirect('/'); //Products don't update until the page is reloaded 

		} else { //Hay errores
			//Destroy image saved by multer
			if(req.file){
				fs.unlinkSync(path.join(__dirname, '/../public/img/products', req.file.filename), (err) => {
					if (err) {
						console.error(err)
						return
					}
				
					console.log('File removed successfully');
				});
			}

			let id = req.params.id;

			req.body.id = id;

			if(!Array.isArray(req.body.categories))
				req.body.categories = [req.body.categories];

			let characteristics = [];

			//To get the value of each characteristic
			for (const [key, value] of Object.entries(req.body)) {
				if(key.includes('characteristic')) {
					characteristics.push(value);
				}
			};
			
			req.body.characteristics = characteristics;

			let featured = 0;

			//To see if a product is featured
			if(req.body.featured == 'on')
				featured = 1;

			req.body.featured = featured;

			res.render('products/editProduct', { errors: errors.mapped() , product: req.body, categories }); //Mapped convierte el arreglo en un objeto literal
			//Donde en lugar de índices tiene los nombres de los inputs del formulario
		}
	
	},
	delete: (req, res) => {
		let id = req.params.id;
		let finalProducts = products.filter(product => product.id != id); //Get all the products that don't match with the given id

		//Destroy image saved by multer
		fs.unlinkSync(path.join(__dirname, '/../public/img', products[id - 1].image), (err) => {
			if (err) {
			  console.error(err)
			  return
			}
		  
			console.log('File removed successfully');
		});

		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts));
		res.redirect('/');
	},
};

module.exports = productController;
