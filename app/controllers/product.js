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
		let notification = '';

		if(req.app.notification){
			notification = req.app.notification;
		}

		res.render('products/products', {products, notification});
	},
	retrieveCreate: (req, res) => {
		res.render('products/createProduct', {categories});
	},
	retrieveProductDetails: (req, res) => {

		let id = req.params.id;
		let product = products.find(product => product.id == id);
		let breadcrumbList = ["Página de inicio", "Productos", product.name];
        let urlList = [""];
        urlList.push(req.baseUrl);
		
		let notification = '';

		if(req.app.notification){
			notification = req.app.notification;
		}
		res.render('products/productDetails', {product, breadcrumbList, urlList, notification});
	},
	create: (req, res) => {
		const errors = validationResult(req);
		//Product file is not working properly****** you can advance without it validating it is empty
		if(errors.isEmpty()){ //No hay errores
			let characteristics = [];
			let featured = 0;
			//To get the value of each characteristic
			for (const [key, value] of Object.entries(req.body)) {
				if(key.includes('characteristic')) {
					characteristics.push(value);
				}
			}
			//To see if a product is featured
			if(req.body.featured == 'on'){
				featured = 1;
			}

			if(!Array.isArray(req.body.categories)){
				req.body.categories = [req.body.categories];
			}

			//Create new product from form data
			let newProduct = { //Validate if identifier is unique
				...req.body, //For name: req.body.name, // price: req.body.price, // categories: req.body.categories, // shortDescription: req.body.shortDescription, // longDescription: req.body.longDescription, // identifier: req.body.identifier, 
				id: products[products.length - 1].id + 1,
				characteristics: characteristics, 
				vendidos: 0,
				toBuy: 0,
				featured: featured,
				image: req.file.filename, 
				carouselImages: [req.file.filename, req.file.filename, req.file.filename], //Update in following sprints
			};

			//Add new product
			products.push(newProduct);

			//Write the new product to the JSON file
			fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
			
			//Notify user about new product creation
			let notification = {activo: 1, accion: "creación", accionDos: "creado", elemento: "producto", nombre: req.body.name, tipo: "bg-success"};

			req.app.notification = notification;
			res.redirect('/product/' + newProduct.id); //Products don't update until the page is reloaded 

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

			if(!Array.isArray(req.body.categories)){
				req.body.categories = [req.body.categories];
			}

			res.render('products/createProduct', { errors: errors.mapped() , old: req.body, categories }); //Mapped convierte el arreglo en un objeto literal
			//Donde en lugar de índices tiene los nombres de los inputs del formulario
		}
		
	},
    retrieveEdit: (req, res) => {
		let id = req.params.id;
		let product = products.find(product => product.id == id);
		res.render('products/editProduct', {product, categories});
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
			}

			//To see if a product is featured
			if(req.body.featured == 'on'){
				featured = 1;
			}

			if(req.file == undefined){
				imagen = product.image;
			} else {
				imagen = req.file.filename;
			}

			if(!Array.isArray(req.body.categories)){
				req.body.categories = [req.body.categories];
			}

			//Create updated product from form data
			let newProduct = { //Validate if identifier is unique
				...req.body, //name: req.body.name, // price: req.body.price, // categories: req.body.categories, // shortDescription: req.body.shortDescription, // longDescription: req.body.longDescription, // identifier: req.body.identifier,
				id: parseInt(id),
				characteristics: characteristics,
				vendidos: product.vendidos,
				toBuy: product.toBuy,
				featured: featured,
				image: imagen, //To be obtained from multer
				carouselImages: product.carouselImages, //Update in following sprints
			};
			
			//Replace old product with updated one
			let index = products.findIndex(element => element.id == id);
			products[index] = newProduct;

			//Write the new product to the JSON file
			fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
			
			//Notify user about product edition
			let notification = {activo: 1, accion: "edición", accionDos: "editado", elemento: "producto", nombre: req.body.name, tipo: "bg-warning"};

			req.app.notification = notification;

			res.redirect('/product/' + id); //Products don't update until the page is reloaded 

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

			if(!Array.isArray(req.body.categories)){
				req.body.categories = [req.body.categories];
			}

			let characteristics = [];

			//To get the value of each characteristic
			for (const [key, value] of Object.entries(req.body)) {
				if(key.includes('characteristic')) {
					characteristics.push(value);
				}
			}
			
			req.body.characteristics = characteristics;

			let featured = 0;

			//To see if a product is featured
			if(req.body.featured == 'on'){
				featured = 1;
			}

			req.body.featured = featured;

			res.render('products/editProduct', { errors: errors.mapped() , product: req.body, categories }); //Mapped convierte el arreglo en un objeto literal
			//Donde en lugar de índices tiene los nombres de los inputs del formulario
		}
	
	},
	delete: (req, res) => {
		let id = req.params.id;
		let finalProducts = products.filter(product => product.id != id); //Get all the products that don't match with the given id

		let index = products.findIndex(element => element.id == id);

		//Destroy image saved by multer
		fs.unlinkSync(path.join(__dirname, '/../public/img/products', products[index].image), (err) => {
			if (err) {
			  console.error(err);
			  return;
			}
		  
			console.log('File removed successfully');
		});

		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, ' '));

		let producto = products.find(product => product.id == id);

		//Notify user about product deletion
		let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "producto", nombre: producto.name, tipo: "bg-danger"};

		req.app.notification = notification;

		res.redirect('/product');
	},
};

module.exports = productController;
