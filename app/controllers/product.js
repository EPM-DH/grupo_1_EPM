const fs = require('fs');
const path = require('path');

//To import categories
const categoriesFilePath = path.join(__dirname, '../data/categories.json');
const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const { validationResult } = require('express-validator');

//Models for JSON
const Product = require('../models/Product');
const Wishlist = require('../models/Wishlist');
const Cart = require('../models/Cart');

//Models for MySQL
const db = require('../database/models');
const { include } = require('./cart');

const productController = {
	retrieveProducts: (req, res) => {
		//JSON
		//let productos = Product.findAll();
		//MySQL
		db.Producto.findAll({include: ['categories', 'carouselImages']})
		.then((products) => {
			let notification = '';

			if(req.app.notification){
				notification = req.app.notification;
			}

			res.render('products/products', {products, notification});
		})
		.catch((err) => {
			console.log(err);
		});

	},
	retrieveCreate: (req, res) => {
		db.Categoria.findAll()
		.then((categories) => {
			res.render('products/createProduct', {categories});
		})
		.catch((err) => {
			console.log(err);
		});
		
	},
	retrieveProductDetails: (req, res) => {
		let id = parseInt(req.params.id);
		//JSON
		//let product = Product.findByPk(id);
		//MySQL
		db.Producto.findByPk(id, {include: ['categories', 'characteristics', 'carouselImages']})
		.then((product) => {
			if(product != undefined){
				return Promise.resolve(product);
			}
			return Promise.reject();
		})
		.then((product) => { //If true -> Hay un producto con ese id
			let breadcrumbList = ["Página de inicio", "Productos", product.name];
			let urlList = [""];
			urlList.push(req.baseUrl);
			
			let notification = '';

			if(req.app.notification){
				notification = req.app.notification;
			}

			//JSON
			//let wishLists = Wishlist.findAllByField('user_id', req.session.userLogged.id);
			//MySQL
			db.Lista_de_deseo.findAll({ where: { usuario_id: req.session.userLogged.id }})
			.then((wishLists) => {
				let errors = undefined;
				let old = undefined;

				if(req.app.renErr){
					errors = req.app.renErr;
					req.app.renErr = undefined
					old = req.app.renOld;
					req.app.renOld = undefined;
				}

				res.render('products/productDetails', {product, breadcrumbList, urlList, notification, wishLists, errors, old});
			})
			.catch((err) => {
				console.log(err);
			});

		}, () => { //If false -> Si no hay un producto con ese id
			return res.redirect('/product');
		})
		.catch((err) => {
			console.log(err);
		});

	},
	create: (req, res) => {
		let errors = validationResult(req);
		//Product file is not working properly****** you can advance without it validating it is empty
		if(errors.isEmpty()){ //No hay errores
			let characteristics = [];
			let characteristics2 = [];
			let featured = 0;
			//To get the value of each characteristic
			for (const [key, value] of Object.entries(req.body)) {
				if(key.includes('characteristic') && value != '') {
					characteristics.push({ description: value });
					characteristics2.push(value);
					delete req.body[key];
				}
			}
			
			//To see if a product is featured
			if(req.body.featured == 'on'){
				featured = 1;
			}

			if(!Array.isArray(req.body.categories)){
				req.body.categories = [req.body.categories];
			}

			let categories = [];
			for(cat of req.body.categories){
				categories.push({name: cat});
			}

			//Create new product from form data
			let newProduct = { //Validate if identifier is unique
				...req.body, //For name: req.body.name, // shortDescription: req.body.shortDescription, // longDescription: req.body.longDescription, // identifier: req.body.identifier,
				price: parseFloat(req.body.price),
				categories: categories,
				characteristics: characteristics, 
				rating: parseInt(req.body.rating),
				vendidos: 0,
				featured: featured,
				image: req.file.filename, 
				carouselImages: [{ name: req.file.filename}, { name: req.file.filename}, { name: req.file.filename}]
			};

			req.body.characteristics = characteristics2;

			//Check that there isn't a product registered with the same identifier already
			//JSON
			//let productInDB = Product.findByField('identifier', req.body.identifier);
			//MySQL
			db.Producto.count({ where: { identifier: req.body.identifier }})
			.then((productInDB) => {
				if(productInDB != 0){ //Return an error to the register form
					//Ya hay un producto en la BD con el identificador utilizado
					//Add error to arrray
					let nuevoError = {
						value: '',
						msg: 'Este identificador ya está siendo utilizado',
						param: 'identifier',
						location: '',
					};
	
					errors.errors.push(nuevoError);

					return Promise.reject();
				}
				
				return Promise.resolve();
			})
			.then(() => { //If true -> Continue product creation
				//Add new product
				//JSON
				//newProduct = Product.create(newProduct);
				//MySQL
				//Add to Producto
				db.Producto.create({...newProduct}, { include: ['characteristics', 'carouselImages', 'categories'] })
				.then((newProduct) => {
					//Notify user about new product creation
					let notification = {activo: 1, accion: "creación", accionDos: "creado", elemento: "producto", nombre: req.body.name, tipo: "bg-success"};

					req.app.notification = notification;
					res.redirect('/product/' + newProduct.id); //Products don't update until the page is reloaded 

				})
				.catch((err) => {
					console.log(err);
				});

			}, () => { //If false -> Send back to form and show the error
				db.Categoria.findAll()
				.then((categories) => {
					return res.render('products/createProduct', { errors: errors.mapped() , old: req.body, categories }); //Mapped convierte el arreglo en un objeto literal
				})
				.catch((err) => {
					console.log(err);
				});
				
			})
			.catch((err) => {
				console.log(err);
			});

		} else { //Hay errores
			//Destroy image saved by multer
			if(req.file){
				Product.deleteImageByName(req.file.filename); //Apart from JSON DB (this is for multer)
			}

			if(!Array.isArray(req.body.categories)){
				req.body.categories = [req.body.categories];
			}

			let characteristics = [''];
			//To get the value of each characteristic
			for (const [key, value] of Object.entries(req.body)) {
				if(key.includes('characteristic') && value != '') {
					characteristics.push(value);
				}
			}
			req.body.characteristics = characteristics;

			db.Categoria.findAll()
			.then((categories) => {
				res.render('products/createProduct', { errors: errors.mapped() , old: req.body, categories }); //Mapped convierte el arreglo en un objeto literal
				//Donde en lugar de índices tiene los nombres de los inputs del formulario
			})
			.catch((err) => {
				console.log(err);
			});

		}
		
	},
    retrieveEdit: (req, res) => {
		let id = parseInt(req.params.id);
		//JSON
		//let product = Product.findByPk(id);
		//MySQL
		db.Producto.findByPk(id, {include: ['categories', 'characteristics']})
		.then((product) => {
			if(product != undefined){
				return Promise.resolve(product);
			}
			return Promise.reject();
		})
		.then((product) => { //If true -> Redirect to editProduct
			db.Categoria.findAll()
			.then((categories) => {
				res.render('products/editProduct', {product, categories});
			})
			.catch((err) => {
				console.log(err);
			});
		}, () => { //If false -> Redirect to product
			return res.redirect('/product');
		}) 
		.catch((err) => {
			console.log(err);
		});

	},
	update: (req, res) => {
		const errors = validationResult(req);

		if(errors.isEmpty()){ //No hay errores
			let id = parseInt(req.params.id);
			let product = Product.findByPk(id);

			if(product == undefined){
				return res.redirect('/product');
			}

			let characteristics = [];
			let imagen;
			let featured = 0;
			//To get the value of each characteristic
			for (const [key, value] of Object.entries(req.body)) {
				if(key.includes('characteristic') && value != '') {
					characteristics.push(value);
					delete req.body[key];
				}
			}

			//To see if a product is featured
			if(req.body.featured == 'on'){
				featured = 1;
			}

			if(req.file == undefined){ //No hay nueva imagen
				imagen = product.image;
			} else { //Hay nueva imagen
				Product.deleteImageByName(product.image); //Borrar imagen anterior
				imagen = req.file.filename; //Asignar nueva imagen
				//Modificar carousel
				for(let i = 0; i < product.carouselImages.length; i++){ 
					product.carouselImages[i] = imagen;
				}
			}

			if(!Array.isArray(req.body.categories)){
				req.body.categories = [req.body.categories];
			}

			//Create updated product from form data
			let newProduct = { //Validate if identifier is unique
				...req.body, //name: req.body.name, // categories: req.body.categories, // shortDescription: req.body.shortDescription, // longDescription: req.body.longDescription, // identifier: req.body.identifier,
				price: parseFloat(req.body.price),
				characteristics: characteristics,
				rating: parseInt(req.body.rating),
				vendidos: product.vendidos,
				featured: featured,
				image: imagen, //To be obtained from multer
				carouselImages: product.carouselImages,
			};

			//Check that there isn't a product registered with the same identifier already
			let productInDB = Product.findByField('identifier', req.body.identifier);

			if(productInDB && productInDB.id != id){ //Return an error to the register form
				//Add error to arrray
				let nuevoError = {
					value: '',
					msg: 'Este identificador ya está siendo utilizado por otro product',
					param: 'identifier',
					location: '',
				};

				errors.errors.push(nuevoError);

				return res.render('products/editProduct', { errors: errors.mapped() , old: req.body, categories }); //Mapped convierte el arreglo en un objeto literal
			}
			
			//Replace old product with updated one
			Product.update(newProduct, id);
			
			//Notify user about product edition
			let notification = {activo: 1, accion: "edición", accionDos: "editado", elemento: "producto", nombre: req.body.name, tipo: "bg-warning"};

			req.app.notification = notification;

			res.redirect('/product/' + id); //Products don't update until the page is reloaded 

		} else { //Hay errores
			//Destroy image saved by multer
			if(req.file){
				Product.deleteImageByName(req.file.filename);
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
		let id = parseInt(req.params.id);
		
		let producto = Product.findByPk(id);

		if(producto == undefined){
			return res.redirect('/product');
		}

		//Remover producto eliminado del carrito 
		Cart.deleteAllProductsFromCartByProductId(id);

		//Remover producto eliminado de la wishlist
		Wishlist.deleteAllProductsFromWishlistByProductId(id);

		Product.delete(id);

		//Notify user about product deletion
		let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "producto", nombre: producto.name, tipo: "bg-danger"};

		req.app.notification = notification;

		res.redirect('/product');
	},
};

module.exports = productController;
