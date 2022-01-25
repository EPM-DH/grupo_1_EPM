//Models
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

const { validationResult } = require('express-validator');

const wishlistController = {
    retrieveWishlist: (req, res) => {
        let breadcrumbList = ["Página de inicio", "Listas de deseos"];
        let urlList = [""];
        urlList.push(req.originalUrl);

        let notification = '';

		if(req.app.notification){
			notification = req.app.notification;
		}

        let userId = parseInt(req.session.userLogged.id);

        let lists = Wishlist.findAllByField('user_id', userId);

        let productos = [];

        for(list of lists) {
            for(producto of list.products){
                let product = Product.findByPk(producto);
                productos.push(product);
            }
            list.products = productos;
            productos = [];
        }

        //To pop the modal in case an error happened
        let errors = undefined;
		let old = undefined;
        let ident = undefined;

		if(req.app.renErr){
			errors = req.app.renErr;
			req.app.renErr = undefined
			old = req.app.renOld;
			req.app.renOld = undefined;
            ident = req.app.ident;
            req.app.ident = undefined;
		}

        res.render('users/wishlist', { lists, breadcrumbList, urlList, notification, errors, old, ident });
    },
    create: (req, res) => {
		const errors = validationResult(req);
        let productId = parseInt(req.params.id);

		if(errors.isEmpty()){ //No hay errores
            let identifier = req.body.name.toLowerCase().substring(0, 3);
            let userId = req.session.userLogged.id;

			//Create new wishlist from form data
			let newWishlist = { //Validate if identifier is unique
				products: [],
                user_id: parseInt(userId),
                image: 'default.png',
                identifier: identifier + userId + '_',
                ...req.body,
			};

			//Add new list
			Wishlist.create(newWishlist);
			
			//Notify user about new list creation
			let notification = {activo: 1, accion: "creación", accionDos: "creado", elemento: "lista", nombre: req.body.name, tipo: "bg-success"};

			req.app.notification = notification;

            if(productId == 0) {
                res.redirect('/wishlist');
            } else {
                res.redirect('/product/' + productId); 
            }

		} else { //Hay errores
            req.app.renErr = errors.mapped();
            req.app.renOld = req.body;

            if(productId == 0) {
                res.redirect('/wishlist');
            } else {
                res.redirect('/product/' + productId); 
            }
		}
	},
    addToWishlist: (req, res) => {
        let id = parseInt(req.params.id); //Id del producto a agregar a la Wishlist
        let listIdentifier = req.query.wishlist; //Identificador de la wishlist
        let list = Wishlist.findByField('identifier', listIdentifier);

        let producto = Product.findByPk(id);

        if(producto == undefined){
            return res.redirect('/product');
        }
        
        //Notify user about wishlist action
		let notification = {activo: 1, accion: "agregación", accionDos: "agregado", elemento: "elemento de la wishlist", nombre: producto.name, tipo: "bg-success"};

		//Si ya existe en la wishlist
        if(list.products.includes(id)){
            notification = {activo: 1, accion: "error", accionDos: "ya existe en la wishlist", elemento: "inclusión de elemento a la wishlist", nombre: producto.name, tipo: "bg-warning"};

            req.app.notification = notification;

            return res.redirect('/product/' + id);
        }

        req.app.notification = notification;

        list.products.push(id);

        Wishlist.update(list);

        res.redirect('/product/' + id);
    },
    update: (req, res) => {
        const errors = validationResult(req);
        let id = parseInt(req.params.id); //Id de la lista a editar 

        let list = Wishlist.findByPk(id);

        //If id was modified using inspect elements in the form
        if(list == undefined){
            return res.redirect('/wishlist');
        }

		if(errors.isEmpty()){ //No hay errores
            let nuevaLista = {
                ...list,
                ...req.body
            }

            console.log(nuevaLista);

            //If wishlist exists, update 
            Wishlist.update(nuevaLista);
            
            //Notify user about wishlist action
            let notification = {activo: 1, accion: "edición", accionDos: "editado", elemento: "wishist", nombre: list.name, tipo: "bg-success"};

            req.app.notification = notification;

            res.redirect('/wishlist');

		} else { //Hay errores
            req.app.renErr = errors.mapped();
            req.app.renOld = req.body;
            req.app.ident = list.identifier;

            res.redirect('/wishlist');
		}
    },
    deleteItem: (req, res) => {
        let productId = parseInt(req.params.id); //Id del elemento (producto) de la wishlist

        let producto = Product.findByPk(productId);

        if(producto == undefined){
            return res.redirect('/wishlist');
        }

        let wlId = parseInt(req.query.wishlist);
        Wishlist.deleteProductFromWishlist(wlId, productId);

		//Notify user about wishlist item deletion
		let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "elemento de la wishlist", nombre: producto.name, tipo: "bg-danger"};

		req.app.notification = notification;

		res.redirect('/wishlist');
	},
    delete: (req, res) => {
        let listId = parseInt(req.params.id); //Id de la lista a eliminar de la wishlist

        let list = Wishlist.findByPk(listId);

        if(list == undefined){
            res.redirect('/wishlist');
        }

        Wishlist.delete(listId);

		//Notify user about wishlist item deletion
		let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "lista de la wishlist", nombre: list.name, tipo: "bg-danger"};

		req.app.notification = notification;

		res.redirect('/wishlist');
	},
};

module.exports = wishlistController;