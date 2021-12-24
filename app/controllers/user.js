const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
//For hashing the password
const bcrypt = require('bcryptjs');

// To import users
const usersFilePath = path.join(__dirname, '../data/usuarios.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8')); //Validate if users variable is empty before anything else

const userController = {
	retrieveRegister: (req, res) => {
		res.render('users/register');
	},
    register: (req, res) => {
        const errors = validationResult(req);

		if(errors.isEmpty()){ //No hay errores
			//Encrypt password
			let encryptedPassword = bcrypt.hashSync(req.body.contrasena, 10);

			//Create new user from form data
			let newUser = {
				id: users[users.length - 1].id + 1,
				firstName: req.body.nombre,
				lastName: req.body.apellido,
				email: req.body.email,
				password: encryptedPassword,
				avatar: req.file.filename,
				rol: 'estandar',
			};

			//Add new product
			users.push(newUser);

			//Write the new product to the JSON file
			fs.writeFileSync(usersFilePath, JSON.stringify(users));
			
			res.redirect('/');	
		} else { //Hay errores
			//Destroy image saved by multer
			if(req.file){
				fs.unlinkSync(path.join(__dirname, '/../public/img/users', req.file.filename), (err) => {
					if (err) {
						console.error(err)
						return
					}
				
					console.log('File removed successfully');
				});
			}

			res.render('users/register', { errors: errors.mapped() , old: req.body }); //Mapped convierte el arreglo en un objeto literal
			//Donde en lugar de índices tiene los nombres de los inputs del formulario
		}
	},
    retrieveLogin: (req, res) => {
		res.render('users/login');
	},
	login: (req, res) => {
		let errors = validationResult(req);

		if(errors.isEmpty()){ //No hay errores
			//Search for user & password
			for(user of users) { 
				if(user.email == req.body.email && bcrypt.compareSync(req.body.contrasena, user.password)) {
					//Login - Crear cookie o session e indicar al usuario que está logeado, etc
					res.redirect('/');
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
};

module.exports = userController;
