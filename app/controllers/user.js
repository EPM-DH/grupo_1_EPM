const { validationResult } = require('express-validator');
//For hashing the password
const bcrypt = require('bcryptjs');

//Models
const User = require('../models/User');
const Cart = require('../models/Cart');
const Wishlist = require('../models/Wishlist');

//Test
/*const db = require('../database/models');*/

const userController = {
	retrieveRegister: (req, res) => {
		/*db.Usuario.findByPk(1, {include: [
			'carrito'
		]}).then((usuario) => {
			console.log(usuario.carrito);
		}).catch((err) => {
			console.log(err);
		});*/
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
				rol: 'estandar',
			};

			//Check that there isn't a user registered with the same email already
			let userInDB = User.findByField('email', req.body.email);

			if(userInDB){ //Return an error to the register form
				//Add error to arrray
				let nuevoError = {
					value: '',
					msg: 'Este email ya está registrado',
					param: 'email',
					location: '',
				};

				errors.errors.push(nuevoError);

				return res.render('users/register', { errors: errors.mapped() , old: req.body }); //Mapped convierte el arreglo en un objeto literal
			}

			//Add new user to DB
			User.create(newUser);

			//Notify user about new user creation
			let notification = {activo: 1, accion: "creación", accionDos: "creado", elemento: "usuario", nombre: req.body.nombre, tipo: "bg-success"};

			req.app.notification = notification;

			return res.redirect('/user/login');
		} else { //Hay errores
			//Destroy image saved by multer
			if(req.file){
				User.deleteImageByName(req.file.filename);
			}

			res.render('users/register', { errors: errors.mapped() , old: req.body }); //Mapped convierte el arreglo en un objeto literal
			//Donde en lugar de índices tiene los nombres de los inputs del formulario
		}
	},
    retrieveLogin: (req, res) => {
		let notification = '';

		if(req.app.notification){
			notification = req.app.notification;
		}

		res.render('users/login', { notification });
	},
	login: (req, res) => {
		let errors = validationResult(req);

		if(errors.isEmpty()){ //No hay errores
			//Search for user & password
			let users = User.findAll();
			for(user of users) { 
				if(user.email == req.body.email && bcrypt.compareSync(req.body.contrasena, user.password)) {
					//Login
					//For session
					let usuario = user;
					delete usuario.password;
					req.session.userLogged = usuario;
					//Only needed when working with JSON files
					res.cookie('active', user.email);

					//Crear cookie si el usuario marcó la casilla de recuérdame
					if(req.body.recuerdame){ //No se elimina la sesión cuando el usuario cierra el navegador
						res.cookie('usuarioLogeado', req.body.email, { maxAge: (3600 * 24) * 1000 }); // 1 día - Esto es opcional y podría ser cualquier valor
						//res.cookie('duracion', 3600, { maxAge: (3600 * 24) * 1000 }); // 1 día
					} /*else { //Crear sesión si el usuario no marcó la casilla de recuérdame 
						res.cookie('usuarioLogeado', req.body.email, { maxAge: (60 * 20) * 1000 }); //20 min
						res.cookie('duracion', 20, { maxAge: (60 * 20) * 1000 }); // 20 min
						
					}*/

					//Indicar al usuario que está logeado
					return res.redirect('/');
				}
			}

			//Add error to arrray
			let nuevoError = {
				value: '',
				msg: 'El usuario o la contraseña son incorrectos',
				param: 'failedVerification',
				location: '',
			};

			errors.errors.push(nuevoError);

			res.render('users/login', { errors: errors.mapped() , old: req.body }); //Mapped convierte el arreglo en un objeto literal
				
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
			res.clearCookie('active');
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
		}

		//For session
		//logged: req.session.userLogged
		res.render('users/profile', { notification });
		//res.render('users/profile', { notification });
	},
	update: (req, res) => {
		let errors = validationResult(req);

		if(errors.isEmpty()){ //No hay errores
			let id = parseInt(req.params.id);
			let usuario = User.findByField('email', req.body.email);

			//let usuario = users.find(user => user.id == id); //This query deletes the password field. Why??
			let contrasena = usuario.password;
			let imagen;
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
				return res.render('users/profile', { errors: errors.mapped() }); //Mapped convierte el arreglo en un objeto literal
			}

			//Check that there isn't a user registered with the same email already
			let userInDB = User.findByField('email', req.body.email);

			if(userInDB && userInDB.id != id){ //Return an error to the editing form
				//Add error to arrray
				let nuevoError = {
					value: '',
					msg: 'Este email ya está registrado con otro usuario',
					param: 'email',
					location: '',
				};

				errors.errors.push(nuevoError);

				return res.render('users/profile', { errors: errors.mapped() , old: req.body }); //Mapped convierte el arreglo en un objeto literal
			}

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
				rol: usuario.rol, //For future implementations consider adding the option to change an user
			};

			//Replace old product with updated one
			User.update(newUser, id);
			
			//Notify user about user edition
			let notification = {activo: 1, accion: "edición", accionDos: "editado", elemento: "usuario", nombre: req.body.nombre, tipo: "bg-warning"};

			req.app.notification = notification;

			return res.redirect('/user/profile'); //User won't update until the page is reloaded 

		} else { //Hay errores
			//Destroy image saved by multer
			if(req.file){
				User.deleteImageByName(req.file.filename);
			}

			let id = req.params.id;

			req.body.id = id;
			
			//Cambiar implementación y utilizar algo más en lugar de res.locals
			res.render('users/profile', { errors: errors.mapped() }); //Mapped convierte el arreglo en un objeto literal
			//Donde en lugar de índices tiene los nombres de los inputs del formulario
		}
	},
	delete: (req, res) => {
		let id = parseInt(req.params.id);

		let usuario = User.findByPk(id);

		if(usuario == undefined){
			return res.redirect('/user/profile');
		}

		//Delete the user cart as well
		Cart.deleteCartByUserId(id);

		//Delete the user wishlists as well
		Wishlist.deleteWishlistByUserId(id);

		User.delete(id);

		//Notify user about user deletion
		let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "usuario", nombre: usuario.firstName, tipo: "bg-danger"};

		req.app.notification = notification;

		return res.redirect('/user/logout'); //Cerrar sesión
	},
	retrieveMange: (req, res) => {
		let breadcrumbList = ["Página de inicio", "Tablero de administración de usuarios"];
        let urlList = [""];
        urlList.push(req.originalUrl);

		let usuarios = User.findAllNonAdmins();

		for(usuario of usuarios){
			delete usuario.password;
		}

		let notification = '';

		if(req.app.notification){
			notification = req.app.notification;
		}

		res.render('users/manage', { breadcrumbList, urlList, usuarios, notification });
	},
	mange: (req, res) => {
		let id = parseInt(req.params.id); //Id from user
		let notification;
		//Get user to promote
		let usuario = User.findByPk(id);

		//Check to see instruction
		if(req.body.rol == 'on'){ //If user is to be promoted
			//Set new role
			usuario.rol = 'administrador';
			//Update
			User.update(usuario, id);

			//Notify user about promotion
			notification = {activo: 1, accion: "promoción", accionDos: "promovido", elemento: "usuario", nombre: usuario.firstName, tipo: "bg-success"};
		} else { //If user is not to be promoted
			//Notify user about promotion
			notification = {activo: 1, accion: "no promoción", accionDos: "no promovido", elemento: "usuario", nombre: usuario.firstName, tipo: "bg-warning"};
		}

		req.app.notification = notification;

		res.redirect('/user/manage');
	},
};

module.exports = userController;
