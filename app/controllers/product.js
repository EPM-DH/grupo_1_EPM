//const fs = require('fs');
//const path = require('path');

//To import categories
//const categoriesFilePath = path.join(__dirname, '../data/categories.json');
//const categories = JSON.parse(fs.readFileSync(categoriesFilePath, 'utf-8'));

const { validationResult } = require('express-validator');

//Models for JSON
const Product = require('../models/Product');
//const Wishlist = require('../models/Wishlist');
//const Cart = require('../models/Cart');

//Models for MySQL
const db = require('../database/models');

const productController = {
	retrieveProducts: (req, res) => {
		//JSON
		//let productos = Product.findAll();
		//MySQL
		db.Producto.findAll({include: ['categories']})
		.then((products) => {
			let notification = '';

			if(req.app.notification){
				notification = req.app.notification;
				req.app.notification = undefined;
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
		db.Producto.findByPk(id, {include: ['categories']})
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
				req.app.notification = undefined;
			}

			let id = 0;
			if(req.session.userLogged){
				id = req.session.userLogged.id;
			}

			//JSON
			//let wishLists = Wishlist.findAllByField('user_id', req.session.userLogged.id);
			//MySQL
			db.Lista_de_deseo.findAll({ where: { usuario_id: id }})
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
			let featured = 0;
			//To get the value of each characteristic
			for (const [key, value] of Object.entries(req.body)) {
				if(key.includes('characteristic') && value != '') {
					characteristics.push(value);
					delete req.body[key];
				}
			}

			if(characteristics.length == 0){
				characteristics = [''];
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
				...req.body, //For name: req.body.name, // shortDescription: req.body.shortDescription, // longDescription: req.body.longDescription, // identifier: req.body.identifier,
				price: parseFloat(req.body.price),
				characteristics: characteristics, 
				rating: parseInt(req.body.rating),
				vendidos: 0,
				featured: featured,
				image: req.file.filename, 
				carouselImages: [req.file.filename, req.file.filename, req.file.filename]
			};

			req.body.characteristics = characteristics;

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
				db.Producto.create({...newProduct})
				.then((newProduct) => {
					//Add to pivot table categories
					let categories = [];
					for(cat of req.body.categories){
						categories.push({producto_id: newProduct.id, categoria_id: cat});
					}
					db.Productos_Categorias.bulkCreate(categories)
					.then(() => {
						//Notify user about new product creation
						let notification = {activo: 1, accion: "creación", accionDos: "creado", elemento: "producto", nombre: req.body.name, tipo: "bg-success"};

						req.app.notification = notification;
						res.redirect('/product/' + newProduct.id); //Products don't update until the page is reloaded 
					})
					.catch((err) => {
						console.log(err);
					});

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

			let characteristics = [];
			//To get the value of each characteristic
			for (const [key, value] of Object.entries(req.body)) {
				if(key.includes('characteristic') && value != '') {
					characteristics.push(value);
				}
			}

			if(characteristics.length == 0){
				characteristics = [''];
			}

			req.body.characteristics = characteristics;

			db.Categoria.findAll()
			.then((categories) => {
				let catTemp = req.body.categories;
				for(let i = 0; i < categories.length; i++){
					let index = catTemp.findIndex(item => item == categories[i].id);
					if(index != -1) {
						catTemp[index] = {name: categories[i].name, id: categories[i].id};
					}
				}
				req.body.categories = catTemp;

				res.render('products/createProduct', { errors: errors.mapped() , old: req.body, categories }); //Mapped convierte el arreglo en un objeto literal
				//Donde en lugar de índices tiene los nombres de los inputs del formulario
			})
			.catch((err) => {
				console.log(err);
			});

		}
		
	},
	cancel: (req, res) => {
		let referer = req.headers.referer;
		let parts = referer.split('/');
		let last = parts.pop();
		if(last != 'create'){
			res.redirect('/product/' + last);
		} else {
			res.redirect('/product');
		}
	},
    retrieveEdit: (req, res) => {
		let id = parseInt(req.params.id);
		//JSON
		//let product = Product.findByPk(id);
		//MySQL
		db.Producto.findByPk(id, {include: ['categories']})
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
		let errors = validationResult(req);
		//Product file is not working properly****** you can advance without it validating it is empty
		if(errors.isEmpty()){ //No hay errores
			let id = parseInt(req.params.id);
			let imagen;
			let characteristics = [];
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

			if(!Array.isArray(req.body.categories)){
				req.body.categories = [req.body.categories];
			}

			db.Producto.findByPk(id, {include: ['categories']})
			.then((product) => {
				if(product != undefined){
					return Promise.resolve(product);
				}
				return Promise.reject();
			})
			.then((product) => { //If true -> Continue edition
				if(req.file == undefined){ //No hay nueva imagen
					imagen = product.image;
				} else { //Hay nueva imagen
					Product.deleteImageByName(product.image); //Apart from JSON DB (this is for multer)
					imagen = req.file.filename; //Asignar nueva imagen
					//Modificar carousel
					for(let i = 0; i < product.carouselImages.length; i++){ 
						product.carouselImages[i] = imagen;
					}
				}
	
				//Create new product from form data
				let newProduct = { //Validate if identifier is unique
					...req.body, //For name: req.body.name, // categories: req.body.categories, // shortDescription: req.body.shortDescription, // longDescription: req.body.longDescription, // identifier: req.body.identifier,
					price: parseFloat(req.body.price),
					characteristics: characteristics, 
					rating: parseInt(req.body.rating),
					vendidos: 0,
					featured: featured,
					image: imagen, 
					carouselImages: product.carouselImages
				};
	
				req.body.characteristics = characteristics;	

				//Check that there isn't a product registered with the same identifier already
				//JSON
				//let productInDB = Product.findByField('identifier', req.body.identifier);
				//MySQL
				db.Producto.findOne({ where : { identifier: req.body.identifier }})
				.then((productInDB) => {
					if(productInDB && productInDB.id != id){ //Return an error
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
					db.Producto.update({...newProduct}, { where: { id: id }})
					.then(() => {
						//Remove the previous categories from pivot table
						db.Productos_Categorias.destroy({where: { producto_id: id }})
						.then(() => {
							//Add to pivot table categories
							let categories = [];
							for(cat of req.body.categories){
								categories.push({producto_id: id, categoria_id: cat});
							}
							db.Productos_Categorias.bulkCreate(categories)
							.then(() => {
								//Notify user about new product creation
								let notification = {activo: 1, accion: "creación", accionDos: "creado", elemento: "producto", nombre: req.body.name, tipo: "bg-success"};

								req.app.notification = notification;
								res.redirect('/product/' + id); //Products don't update until the page is reloaded 
							})
							.catch((err) => {
								console.log(err);
							});
						})
						.catch((err) => {
							console.log(err);
						});

					})
					.catch((err) => {
						console.log(err);
					});

				}, () => { //If false -> Send back to form and show the error
					db.Categoria.findAll()
					.then((categories) => {
						req.body.id = id;
						let catTemp = req.body.categories;
						for(let i = 0; i < categories.length; i++){
							let index = catTemp.findIndex(item => item == categories[i].id);
							if(index != -1) {
								catTemp[index] = {name: categories[i].name, id: categories[i].id};
							}
						}
						req.body.categories = catTemp;
						return res.render('products/editProduct', { errors: errors.mapped(), product: req.body, categories }); //Mapped convierte el arreglo en un objeto literal
					})
					.catch((err) => {
						console.log(err);
					});
					
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

		} else { //Hay errores
			//Destroy image saved by multer
			if(req.file){
				Product.deleteImageByName(req.file.filename); //Apart from JSON DB (this is for multer)
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

			if(characteristics.length == 0){
				characteristics = [''];
			}
			
			req.body.characteristics = characteristics;

			let featured = 0;

			//To see if a product is featured
			if(req.body.featured == 'on'){
				featured = 1;
			}

			req.body.featured = featured;

			db.Categoria.findAll()
			.then((categories) => {
				let catTemp = req.body.categories;
				for(let i = 0; i < categories.length; i++){
					let index = catTemp.findIndex(item => item == categories[i].id);
					if(index != -1) {
						catTemp[index] = {name: categories[i].name, id: categories[i].id};
					}
				}
				req.body.categories = catTemp;

				res.render('products/editProduct', { errors: errors.mapped() , product: req.body, categories }); //Mapped convierte el arreglo en un objeto literal
				//Donde en lugar de índices tiene los nombres de los inputs del formulario
			})
			.catch((err) => {
				console.log(err);
			});

		}
	
	},
	delete: (req, res) => {
		let id = parseInt(req.params.id);
		
		//JSON
		//let producto = Product.findByPk(id);
		//MySQL
		db.Producto.findByPk()
		.then((producto) => {
			if(producto != undefined){
				return Promise.resolve(producto);
			}
			return Promise.reject();
		})
		.then((producto) => { //If true -> Procedemos con la eliminación
			//Remover producto eliminado del carrito 
			let carrito = db.Carrito.destroy({ where: { producto_id: id }});

			//Remover producto eliminado de la wishlist
			let lista = db.Productos_Lista_de_deseos.destroy({ where: { producto_id: id }});

			//Eliminar de los productos
			let product = db.Producto.destroy({ where: { id: id }});

			Promise.all([carrito, lista, product])
			.then(() => {
				//Notify user about product deletion
				let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "producto", nombre: producto.name, tipo: "bg-danger"};

				req.app.notification = notification;

				res.redirect('/product');
			})
			.catch((err) => {
				console.log(err);
			});

		}, () => { //If false -> Redirect to product page
			return res.redirect('/product');
		})
		.catch((err) => {
			console.log(err);
		});

	},
};

module.exports = productController;
