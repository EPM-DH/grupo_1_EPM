const { validationResult } = require('express-validator');

//Models
const Product = require('../models/Product');

const mainController = {
	index: (req, res) => {
		let productos = Product.findFeatured();
		
		let notification = '';

		if(req.app.notification){
			notification = req.app.notification;
		}

		res.render('home', {products: productos, notification});
	},
	retrieveContact: (req, res) => {
		let breadcrumbList = ["Página de inicio", "Contáctanos"];
        let urlList = [""];
        urlList.push(req.originalUrl);

		let notification = '';

		if(req.app.notification){
			notification = req.app.notification;
		}

		res.render('contact', { notification, breadcrumbList, urlList });
	},
	contact: (req, res) => {
		const errors = validationResult(req);
		//Product file is not working properly****** you can advance without it validating it is empty
		if(errors.isEmpty()){ //No hay errores
			//Notify user about contact form submitted
			let notification = {activo: 1, accion: "envío", accionDos: "enviado", elemento: "formulario de contacto", nombre: "Formulario de contacto", tipo: "bg-success"};

			req.app.notification = notification;

			console.log(req.body); //Pending to implement*******

			res.redirect('/contact');
		} else { //Hay errores
			res.render('contact', { errors: errors.mapped() , old: req.body }); //Mapped convierte el arreglo en un objeto literal
			//Donde en lugar de índices tiene los nombres de los inputs del formulario
		}
	},
	retrieveAbout: (req, res) => {
		let breadcrumbList = ["Página de inicio", "¿Quienes somos?"];
        let urlList = [""];
        urlList.push(req.originalUrl);

		res.render('aboutUs', { breadcrumbList, urlList });
	},
	retrievePrivacy: (req, res) => {
		let breadcrumbList = ["Página de inicio", "Aviso de privacidad"];
        let urlList = [""];
        urlList.push(req.originalUrl);

		res.render('privacy', { breadcrumbList, urlList });
	},
	retrieveFaq: (req, res) => {
		let breadcrumbList = ["Página de inicio", "Preguntas más frecuentes"];
        let urlList = [""];
        urlList.push(req.originalUrl);

		res.render('faq', { breadcrumbList, urlList });
	},
};

module.exports = mainController;
