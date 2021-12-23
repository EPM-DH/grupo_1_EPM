const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

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
			//Create new user from form data
			let newUser = {
				id: users[users.length - 1].id + 1,
				firstName: req.body.nombre,
				lastName: req.body.apellido,
				email: req.body.email,
				password: req.body.contrasena,
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
			if(req.file.filename != ''){
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
};

module.exports = userController;
