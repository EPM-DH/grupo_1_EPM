//Models
const Product = require('../models/Product');
const Cart = require('../models/Cart');
const Wishlist = require('../models/Wishlist');

//For using JQuery in Node (express)
/*var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('home')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);*/

const shoppingController = {
	getCart: (req, res) => {
        let breadcrumbList = ["Página de inicio", "Carrito"];
        let urlList = [""];
        urlList.push(req.originalUrl);

        let products = [];
        let index = 0;
        let cart;

        if(req.session.userLogged) { //Si hay una sesión activa
            cart = Cart.findAllByField('user_id', req.session.userLogged.id);
        } else {
            cart = Cart.findAllByField('user_id', 0);
        }

        //To get the product information
        for(item of cart) {
            let productId = item.product_id;
            products.push(Product.findByPk(productId));
            products[index].quantity = cart[index].quantity;
            products[index].cartId = cart[index].id;
            index++;
        }

        let notification = '';

		if(req.app.notification){
			notification = req.app.notification;
		}

		res.render('cart/cart', {notification, products, breadcrumbList, urlList});
	},
    addItem: (req, res) => {
        let productId = parseInt(req.params.id);
        let userId;
        if(req.session.userLogged) {
            userId = req.session.userLogged.id;
        } else {
            userId = 0;
        }

        let currentItem = Cart.findByFields('product_id', productId, 'user_id', userId); 

        if(currentItem == undefined){
            return res.redirect('/product');
        }

        let productName = Product.findByPk(productId).name;
        let referer = req.headers.referer;
        let parts = referer.split('/');
        //To remove http://localhost:3500
        parts.shift()
        parts.shift()
        parts.shift();
        let location = parts;

        if(currentItem && userId == currentItem.user_id) { //Si hay un producto idéntico ya añadido 
            //y el id del usuario logeado es igual al del producto que está en la BD
            currentItem.quantity = currentItem.quantity + 1;
            Cart.update(currentItem);
        } else {
            let newItem = {
                product_id: productId,
                user_id: userId,
                quantity: 1,
            };
            Cart.create(newItem);
        }

        //Notify user about new product creation
        let notification = {activo: 1, accion: "agregación", accionDos: "añadido", elemento: "producto al carrito", nombre: productName, tipo: "bg-success"};

        req.app.notification = notification;

        if(location == '') {
            res.redirect('/');
        } else if (location.length == 1){
            if(location == 'wishlist'){
                //Delete item from wishlist if user had it there 
                notification = {activo: 1, accion: "agregación", accionDos: "añadido y eliminado", elemento: "producto al carrito y eliminación de la lista de deseos", nombre: productName, tipo: "bg-success"};
                let wlId = parseInt(req.query.wishlist);
                Wishlist.deleteProductFromWishlist(wlId, productId);
            }
            res.redirect('/' + location);
        } else {
            let output = '';
            for(it of location) { 
                output += '/' + it; 
            }
            res.redirect(output);
        }
    },
    increaseItem: (req, res) => {
        let cartId = parseInt(req.params.id);
        
        let currentItem = Cart.findByPk(cartId); 

        if(currentItem == undefined){
            return res.redirect('/cart');
        }

        let productName = Product.findByPk(currentItem.product_id).name;

        currentItem.quantity = currentItem.quantity + 1;
        Cart.update(currentItem);

        //Notify user about new product creation
        let notification = {activo: 1, accion: "agregación", accionDos: "añadido", elemento: "un producto al carrito", nombre: productName, tipo: "bg-success"};

        req.app.notification = notification;

        res.redirect('/cart');
    },
    decreaseItem: (req, res) => {
        let cartId = parseInt(req.params.id);

        let currentItem = Cart.findByPk(cartId); 

        if(currentItem == undefined){
            return res.redirect('/cart');
        }

        let productName = Product.findByPk(currentItem.product_id).name;

        currentItem.quantity = currentItem.quantity - 1;
        if(currentItem.quantity == 0){
            //Trigger modal for deleting the element
        } else {
            Cart.update(currentItem);

            //Notify user about new product creation
            let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "un producto del carrito", nombre: productName, tipo: "bg-danger"};

            req.app.notification = notification;

            res.redirect('/cart');
        }
    },
    dismiss: (req, res) => {
        //Modal is closed in the JS file
        req.app.cartFlag = 1;

        res.redirect('/');
	},
    include: (req, res) => {
        //Modal is closed in the JS file
		req.app.cartFlag = 1;
        let allCart = Cart.findAll();

        //Think of better implementation

        //For getting the index inside a for...of
        //const [index, item] of allCart.entries()
        for(item of allCart){
            //Determine if item in user cart exists in guest cart too
            let exists = allCart.find(element => element.user_id == 0 && item.product_id == element.product_id && item.user_id == req.session.userLogged.id);
            let index = allCart.findIndex(element => element.user_id == 0 && item.product_id == element.product_id && item.user_id == req.session.userLogged.id);
            if(exists) {
                item.quantity = item.quantity + exists.quantity;
                allCart.splice(index, 1);
            }
        }

        //Assign missing guest elements (new) to current user
        for(item of allCart){
            if(item.user_id == 0){
                item.user_id = req.session.userLogged.id;
            }
        }

        /*for(item of allCart) {
            console.log("Item: ");
            console.log(item);
            for(guest of guestItems){
                console.log("Guest: ");
                console.log(guest);
                if(item.user_id == 1 && item.product_id == guest.product_id && item.id != guest.id){ 
                    console.log("Item que cumple con la condición: ");
                    console.log(item);
                    item.quantity = item.quantity + guest.quantity;
                    console.log("Item modificado: ");
                    console.log(item);
                    let index = allCart.findIndex(item => item.id == guest.id);
                    console.log("Index del elemento a eliminar (en arreglo completo) " + index);
                    allCart.splice(index, 1);
                } else if (guest.user_id == 0) {
                    console.log("Elemento remplazado en su id: ");
                    console.log(item);
                    let index = allCart.findIndex(item => item.id == guest.id);
                    allCart[index].user_id = 1;
                }
            }
        }*/

        Cart.updateAll(allCart);

        //Notify user about cart item deletion
		let notification = {activo: 1, accion: "integración", accionDos: "integrado", elemento: "elementos del carrito de invitado", nombre: 'Carrito de invitado', tipo: "bg-success"};

		req.app.notification = notification;

        res.redirect('/');
	},
    delete: (req, res) => {
		let id = parseInt(req.params.id); //Id del elemento del carrito de compras, no del producto

        //No need to validate the user profile, because we are using DB id's and they're unique

        //let userId = req.body.session.userLogged.id;
        let elemento = Cart.findByPk(id);

        if(elemento == undefined){
            return res.redirect('/cart');
        }

        let producto = Product.findByPk(elemento.product_id);

		//Cart.deleteByItemAndUser(id, userId);
        Cart.delete(id);

		//Notify user about cart item deletion
		let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "elemento del carrito", nombre: producto.name, tipo: "bg-danger"};

		req.app.notification = notification;

		res.redirect('/cart');
	},
};

module.exports = shoppingController;
