const { validationResult } = require('express-validator');
//For hashing the password
const bcrypt = require('bcryptjs');

//Models for JSON
const User = require('../models/User');
//const Cart = require('../models/Cart');
//const Wishlist = require('../models/Wishlist');

//Model for MySQL
const db = require('../database/models');

const userController = {
	retrieveRegister: (req, res) => {
		res.render('users/register');
	},
    register: (req, res) => {
        const errors = validationResult(req);

		if(errors.isEmpty()){ //No hay errores
			//Encrypt password
			let encryptedPassword = bcrypt.hashSync(req.body.contrasena, 10);
			let image = 'default.png';

			if(req.file) {
				image = req.file.filename;
			}

			//Create new user from form data
			let newUser = { //Fields used in the JSON and used in the form don't match, so deconstruction can't be implemented
				firstName: req.body.nombre,
				lastName: req.body.apellido,
				email: req.body.email,
				password: encryptedPassword,
				avatar: image,
				rol_id: 1
			};

			//Check that there isn't a user registered with the same email already
			//JSON
			//let userInDB = User.findByField('email', req.body.email);

			//MySQL
			db.Usuario.count({where: { email: req.body.email }})
			.then((countUser) => {
				if(countUser != 0) {
					console.log("Ya hay un email");
					return Promise.resolve();
				} else {
					console.log("No hay un email");
					return Promise.reject();
				}
			})
			.then(() => { //If true -> There is already a user registered with that email address
				//Add error to arrray
				console.log("Promesa es true");
				let nuevoError = {
					value: '',
					msg: 'Este email ya está registrado',
					param: 'email',
					location: '',
				};

				errors.errors.push(nuevoError);

				return res.render('users/register', { errors: errors.mapped() , old: req.body }); //Mapped convierte el arreglo en un objeto literal
			}, () => { //If false -> The email is nos yet being used
				console.log("Promesa es false");
				//Add new user to DB
				//JSON
				//User.create(newUser);
				//MySQL
				db.Usuario.create({...newUser})
				.then(() => { //If user was created
					//Notify user about new user creation
					let notification = {activo: 1, accion: "creación", accionDos: "creado", elemento: "usuario", nombre: req.body.nombre, tipo: "bg-success"};

					req.app.notification = notification;

					return res.redirect('/user/login');					
				}).catch((err) => {
					console.log(err);
				});

			})
			.catch((err) => {
				console.log(err);
			});

		} else { //Hay errores
			//Destroy image saved by multer
			if(req.file){
				User.deleteImageByName(req.file.filename); //Apart from JSON DB (this is for multer)
			}

			res.render('users/register', { errors: errors.mapped() , old: req.body }); //Mapped convierte el arreglo en un objeto literal
			//Donde en lugar de índices tiene los nombres de los inputs del formulario
		}
	},
    retrieveLogin: (req, res) => {
		let notification = '';

		if(req.app.notification){
			notification = req.app.notification;
			req.app.notification = undefined;
		}

		res.render('users/login', { notification });
	},
	login: (req, res) => {
		let errors = validationResult(req);

		if(errors.isEmpty()){ //No hay errores
			//Search for user & password
			//JSON
			//let users = User.findAll();
			//MySQL
			db.Usuario.findAll()
			.then((users) => {
				for(user of users) { 
					if(user.email == req.body.email && bcrypt.compareSync(req.body.contrasena, user.password)) {
						//Login
						//For session
						let usuario = user;
						delete usuario.password;
						req.session.userLogged = usuario;
						//Only needed when working with JSON files
						//res.cookie('active', user.email);
	
						//Crear cookie si el usuario marcó la casilla de recuérdame
						if(req.body.recuerdame){ //No se elimina la sesión cuando el usuario cierra el navegador
							res.cookie('usuarioLogeado', req.body.email, { maxAge: (3600 * 24) * 1000 }); // 1 día - Esto es opcional y podría ser cualquier valor
							//res.cookie('duracion', 3600, { maxAge: (3600 * 24) * 1000 }); // 1 día
						} /*else { //Crear sesión si el usuario no marcó la casilla de recuérdame 
							res.cookie('usuarioLogeado', req.body.email, { maxAge: (60 * 20) * 1000 }); //20 min
							res.cookie('duracion', 20, { maxAge: (60 * 20) * 1000 }); // 20 min
							
						}*/
	
						//Indicar al usuario que está logeado
						return Promise.resolve()
					}
				}
				return Promise.reject();
			})
			.then(() => { //If true -> Si existe un usuario en la BD con las credenciales dadas
				return res.redirect('/');
			}, () => { //If false -> No hay ningun usuario con las credenciales indicadas
				//Add error to arrray
				let nuevoError = {
					value: '',
					msg: 'El usuario o la contraseña son incorrectos',
					param: 'failedVerification',
					location: '',
				};

				errors.errors.push(nuevoError);

				res.render('users/login', { errors: errors.mapped() , old: req.body }); //Mapped convierte el arreglo en un objeto literal
			})
			.catch((err) => {
				console.log(err);
			});
				
		} else { //Hay errores
			res.render('users/login', { errors: errors.mapped() , old: req.body }); //Mapped convierte el arreglo en un objeto literal
			//Donde en lugar de índices tiene los nombres de los inputs del formulario
		}
	},
	logout: (req, res) => {
		//For session
		//First check if session exists
		if(req.session.userLogged){
			res.clearCookie('usuarioLogeado');
			//res.clearCookie('active');
			req.session.destroy();
		}
		
		req.app.cartFlag = undefined;

		//First check if cookie exists
		/*if(req.cookies.user){
			//res.clearCookie('usuarioLogeado');
			//res.clearCookie('duracion');
			//req.app.locals.logged = undefined;
		}*/
		return res.redirect('/');
	},
	profile: (req, res) => {
		let notification = '';

		if(req.app.notification){
			notification = req.app.notification;
			req.app.notification = undefined;
		}

		db.Usuario.findOne({ where: { email: req.session.userLogged.email }})
		.then((usuario) => {
			//For session
			//logged: req.session.userLogged -> Deprecated, now using the DB information
			res.render('users/profile', { notification, usuario });
		})
		.catch((err) => {
			console.log(err);
		});

	},
	update: (req, res) => {
		let errors = validationResult(req);
		let email = req.session.userLogged.email;

		if(errors.isEmpty()){ //No hay errores
			let id = parseInt(req.params.id);
			let imagen;
			//JSON
			//let usuario = User.findByField('email', req.body.email);
			//MySQL
			db.Usuario.findOne({where: { email: email }})
			.then((usuario) => {
				let contrasena = usuario.password;
				let nuevoError;

				if(req.body.contrasenaOld != '' || req.body.contrasena != '' || req.body.confirmarcontrasena != ''){
					if(req.body.contrasenaOld == '') {
						//Create new error
						nuevoError = {
							value: '',
							msg: 'La contraseña actual es necesaria para poder cambiar de contraseña',
							param: 'contrasenaOld',
							location: '',
						};
	
						errors.errors.push(nuevoError);
					} else if (!bcrypt.compareSync(req.body.contrasenaOld, contrasena)) {
						//Create new error
						nuevoError = {
							value: '',
							msg: 'La contraseña ingresada es incorrecta',
							param: 'contrasenaOld',
							location: '',
						};
	
						errors.errors.push(nuevoError);
					} 
					if (req.body.confirmarcontrasena == '') {
						//Create new error
						nuevoError = {
							value: '',
							msg: 'La confirmación de la contraseña no puede estar vacía',
							param: 'confirmarcontrasena',
							location: '',
						};
	
						errors.errors.push(nuevoError);
					} else if (req.body.confirmarcontrasena !== req.body.contrasena) {
						//Create new error
						nuevoError = {
							value: '',
							msg: 'La confirmación de la contraseña no coincide con la contraseña',
							param: 'confirmarcontrasena',
							location: '',
						};
	
						errors.errors.push(nuevoError);
					} 
					if(req.body.contrasena == '') {
						//Create new error
						nuevoError = {
							value: '',
							msg: 'La contraseña no puede estar vacía',
							param: 'contrasena',
							location: '',
						};
	
						errors.errors.push(nuevoError);
					} else if (bcrypt.compareSync(req.body.contrasena, contrasena)) { //Verificar si la contraseña no está repetida (quiere que la nueva sea la misma que la vieja)
						//Create new error
						nuevoError = {
							value: '',
							msg: 'La nueva contraseña debe ser diferente a la contraseña actual',
							param: 'contrasena',
							location: '',
						};
	
						errors.errors.push(nuevoError);
					}
				}
	
				if(!errors.isEmpty()){
					return Promise.reject(usuario);
				}

				return Promise.resolve(usuario, contrasena);
			})
			.then((usuario, contrasena) => { //If true -> If there were no errors
				//Check that there isn't a user registered with the same email already
				//JSON
				//let userInDB = User.findByField('email', req.body.email);
				//MySQL
				db.Usuario.findOne({ where: { email: email }})
				.then((userInDB) => {
					if(userInDB && userInDB.id != id){ //Return an error to the editing form
						//Add error to arrray
						let nuevoError = {
							value: '',
							msg: 'Este email ya está registrado con otro usuario',
							param: 'email',
							location: '',
						};
	
						errors.errors.push(nuevoError);
	
						return Promise.reject(usuario);
					}
					return Promise.resolve(usuario, contrasena);
				})
				.then((usuario, contrasena) => { //If true -> Form the object
					if(req.body.contrasena){
						contrasena = bcrypt.hashSync(req.body.contrasena, 10);
					} 
		
					if(req.file == undefined){
						imagen = usuario.avatar;
					} else {
						imagen = req.file.filename;
					}
		
					//Create updated user from form data
					let newUser = { //Fields used in the JSON and used in the form don't match, so deconstruction can't be implemented
						firstName: req.body.nombre,
						lastName: req.body.apellido,
						email: req.body.email,
						password: contrasena,
						avatar: imagen,
						rol: usuario.rol, 
					};
		
					//Replace old product with updated one
					//JSON
					//User.update(newUser, id);
					//MySQL
					db.Usuario.update({...newUser}, { where: { id: id }})
					.then(() => {
						//Notify user about user edition
						let notification = {activo: 1, accion: "edición", accionDos: "editado", elemento: "usuario", nombre: req.body.nombre, tipo: "bg-warning"};
			
						req.app.notification = notification;
			
						return res.redirect('/user/profile'); //User won't update until the page is reloaded 
					})
					.catch((err) => {
						console.log(err);
					});
					
				}, (usuario) => { //If false -> Redirect to show errors
					return res.render('users/profile', { errors: errors.mapped() , old: req.body, usuario }); //Mapped convierte el arreglo en un objeto literal
				})
				.catch((err) => {
					console.log(err);
				});

			}, (usuario) => { //If false -> If there were errors
				return res.render('users/profile', { errors: errors.mapped(), usuario }); //Mapped convierte el arreglo en un objeto literal
			})
			.catch((err) => {
				console.log(err);
			});

		} else { //Hay errores
			//Destroy image saved by multer
			if(req.file){
				User.deleteImageByName(req.file.filename); //Apart from JSON DB (this is for multer)
			}

			let id = req.params.id;

			req.body.id = id;
			
			db.Usuario.findOne({where: { email: email }})
			.then((usuario) => {
				res.render('users/profile', { errors: errors.mapped(), usuario }); //Mapped convierte el arreglo en un objeto literal
				//Donde en lugar de índices tiene los nombres de los inputs del formulario
			})
			.catch((err) => {
				console.log(err);
			});

		}
	},
	delete: (req, res) => { //Not tested yet
		let id = parseInt(req.params.id);

		//JSON
		//let usuario = User.findByPk(id);
		//MySQL
		db.Usuario.findByPk(id)
		.then((usuario) => {
			if(usuario != undefined){
				Promise.resolve(usuario);
			}
			Promise.reject();
		})
		.then((usuario) => { //If true -> Si existe el usuario a eliminar
			//JSON
			//Delete the user cart as well
			//Cart.deleteCartByUserId(id);
			//Delete the user wishlists as well
			//Wishlist.deleteWishlistByUserId(id);
			//User.delete(id);

			//MySQL
			let deleteCart = db.Carrito.destroy({ where: { usuario_id: id }});
			let deleteWishlist = db.Lista_de_deseo.destroy({ where: { usuario_id: id }});
			let deleteUser = db.Usuario.destroy({ where: { id: id }});

			//Promise all
			Promise.all([deleteCart, deleteWishlist, deleteUser])
			.then(() => {
				//Notify user about user deletion
				let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "usuario", nombre: usuario.firstName, tipo: "bg-danger"};

				req.app.notification = notification;

				return res.redirect('/user/logout'); //Cerrar sesión
			})
			.catch((err) => {
				console.log(err);
			});

		}, () => { //If false -> Si no existe el usuario a eliminar
			return res.redirect('/user/profile');
		})
		.catch((err) => {
			console.log(err);
		});

	},
	retrieveMange: (req, res) => {
		let breadcrumbList = ["Página de inicio", "Tablero de administración de usuarios"];
        let urlList = [""];
        urlList.push(req.originalUrl);

		//JSON
		//let usuarios = User.findAllNonAdmins();
		//MySQL
		db.Usuario.findAll({where: { rol_id: 1 }})
		.then((usuarios) => {
			for(usuario of usuarios){
				delete usuario.password;
			}
	
			let notification = '';
	
			if(req.app.notification){
				notification = req.app.notification;
				req.app.notification = undefined;
			}
	
			res.render('users/manage', { breadcrumbList, urlList, usuarios, notification });
		})
		.catch((err) => {
			console.log(err);
		});

	},
	mange: (req, res) => {
		let id = parseInt(req.params.id); //Id from user
		let notification;
		//Get user to promote
		//JSON
		//let usuario = User.findByPk(id);
		//MySQL
		db.Usuario.findByPk(id)
		.then((usuario) => {
			//Check to see instruction
			if(req.body.rol == 'on'){ //If user is to be promoted
				//Set new role
				usuario.rol_id = 2;
				console.log(usuario);
				//Update
				//JSON
				//User.update(usuario, id);
				//MySQL
				db.Usuario.update({...usuario.dataValues}, { where: { id: id }})
				.then(() => {
					//Notify user about promotion
					notification = {activo: 1, accion: "promoción", accionDos: "promovido", elemento: "usuario", nombre: usuario.firstName, tipo: "bg-success"};
					req.app.notification = notification;

					res.redirect('/user/manage');
				})
				.catch((err) => {
					console.log(err);
				});

			} else { //If user is not to be promoted
				//Notify user about promotion
				notification = {activo: 1, accion: "no promoción", accionDos: "no promovido", elemento: "usuario", nombre: usuario.firstName, tipo: "bg-warning"};
		
				req.app.notification = notification;

				res.redirect('/user/manage');
			}

		})
		.catch((err) => {
			console.log(err);
		});

	},
};

module.exports = userController;
