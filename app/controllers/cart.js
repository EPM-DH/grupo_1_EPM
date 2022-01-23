//Models for JSON
//const Product = require('../models/Product');
//const Cart = require('../models/Cart');
//const Wishlist = require('../models/Wishlist');

//Model for MySQL
const db = require('../database/models');

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

        //let products = [];
        let user_id = 0;
        //let cart;

        if(req.session.userLogged) { //Si hay una sesión activa
            user_id = req.session.userLogged.id;
        } 

        //JSON
        //cart = Cart.findAllByField('user_id', user_id);
        //MySQL
        let carrito = db.Carrito.findAll({where: { usuario_id: user_id }});
        let producto = db.Producto.findAll({include: ['categories']});

        Promise.all([carrito, producto])
        .then(([carrito, producto]) => {
            for(let i = 0; i < carrito.length; i++){ //Think of more efficient approach
                for(let j = 0; j < producto.length; j++){
                    if(carrito[i].producto_id == producto[j].id) {
                        products.push(producto[j].dataValues);
                        products[i].quantity = carrito[i].quantity;
                        products[i].cartId = carrito[i].id;
                    }
                }
            }
            
            let notification = '';

            if(req.app.notification){
                notification = req.app.notification;
            }

            res.render('cart/cart', {notification, products, breadcrumbList, urlList});

        })
        .catch((err) => {
            console.log(err);
        });

	},
    addItem: (req, res) => {
        let productId = parseInt(req.params.id);
        let userId = 0;
        if(req.session.userLogged) {
            userId = req.session.userLogged.id;
        } 

        //JSON
        //let currentItem = Cart.findByFields('product_id', productId, 'user_id', userId); 
        //MySQL
        db.Carrito.findOne({ where: { [Op.and]: [
            {producto_id : productId},
            {usuario_id: userId}
        ] }})
        .then((currentItem) => {
            if(currentItem != undefined){
                return Promise.resolve(currentItem);
            }
            return Promise.reject();
        })
        .then((currentItem) => { //If true -> Continue
            //JSON
            //let productName = Product.findByPk(productId).name;
            //MySQL
            db.Producto.findByPk(productId)
            .then((producto) => {
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
                    return Promise.resolve(currentItem, producto, location);
                } else {
                    let newItem = {
                        product_id: productId,
                        user_id: userId,
                        quantity: 1,
                    };
                    return Promise.reject(newItem, producto, location);
                }
            })
            .then((currentItem, producto, location) => { //If true -> Update the cart
                //JSON
                //Cart.update(currentItem);
                //MySQL
                db.Carrito.update(currentItem, { where: { id : currentItem.id }})
                .then(() => {
                    console.log("Elemento del carrito actualizado");
                    return (producto, location);
                })
                .catch((err) => {
                    console.log(err);
                });
            }, (newItem, producto, location) => { //If false -> Create new cart entry
                //JSON
                //Cart.create(newItem);
                db.Carrito.create(newItem)
                .then(() => {
                    console.log("Nuevo elemento añadido al carrito");
                    return (producto, location);
                })
                .catch((err) => {
                    console.log(err);
                });
            })
            .then((producto, location) => { //Avanzar
                let productName = producto.name;
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
                        //JSON
                        //Wishlist.deleteProductFromWishlist(wlId, productId);
                        //MySQL
                        db.Productos_Lista_de_deseos.destroy({ where: { [Op.and]: [
                            {producto_id : productId},
                            {lista_de_deseo_id: wlId}
                        ] }})
                        .then(() => {
                            res.redirect('/' + location);
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    } else {
                        res.redirect('/' + location);
                    }
                } else {
                    let output = '';
                    for(it of location) { 
                        output += '/' + it; 
                    }
                    res.redirect(output);
                }
            }) 
            .catch((err) => {
                console.log(err);
            });

        }, () => { //If false -> Redirect to product view
            return res.redirect('/product');
        })
        .catch((err) => {
            console.log(err);
        });

    },
    increaseItem: (req, res) => {
        let cartId = parseInt(req.params.id);
        
        //JSON
        //let currentItem = Cart.findByPk(cartId); 
        //MySQL
        db.Carrito.findByPk(cartId)
        .then((currentItem) => {
            if(currentItem != undefined){
                return Promise.resolve(currentItem);
            }
            return Promise.reject();
        })
        .then((currentItem) => { //If true -> Continue
            //JSON
            //let productName = Product.findByPk(currentItem.product_id).name;
            //MySQL
            let productName = db.Producto.findByPk(currentItem.producto_id);
            currentItem.quantity = currentItem.quantity + 1;
            //JSON
            //Cart.update(currentItem);
            //MySQL
            let carrito = db.Carrito.update(currentItem, { where: { id: currentItem.id }});

            Promise.all([productName, carrito])
            .then(([productName, carrito]) => {
                //Notify user about new product creation
                let notification = {activo: 1, accion: "agregación", accionDos: "añadido", elemento: "un producto al carrito", nombre: productName, tipo: "bg-success"};

                req.app.notification = notification;

                res.redirect('/cart');
            })
            .catch((err) => {
                console.log(err);
            });

        }, () => { //If false -> Redirect to cart page
            return res.redirect('/cart');
        })
        .catch((err) => {
            console.log(err);
        });
        
    },
    decreaseItem: (req, res) => {
        let cartId = parseInt(req.params.id);

        //JSON
        //let currentItem = Cart.findByPk(cartId); 
        //MySQL
        db.Carrito.findByPk(cartId)
        .then((currentItem) => {
            if(currentItem != undefined){
                return Promise.resolve(currentItem);
            }
            return Promise.reject();
        })
        .then((currentItem) => { //If true -> Continue
            //JSON
            //let productName = Product.findByPk(currentItem.product_id).name;
            //MySQL
            db.Producto.findByPk(currentItem.producto_id)
            .then((productName) => {
                currentItem.quantity = currentItem.quantity - 1;
                if(currentItem.quantity == 0){
                    //Trigger modal for deleting the element
                } else {
                    //JSON
                    //Cart.update(currentItem);
                    //MySQL
                    db.Carrito.update(currentItem, { where: { id: currentItem.id }})
                    .then(() => {
                        //Notify user about new product creation
                        let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "un producto del carrito", nombre: productName, tipo: "bg-danger"};

                        req.app.notification = notification;

                        res.redirect('/cart');                        
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                }
            })
            .catch((err) => {
                console.log(err);
            });
        }, () => { //If false -> Redirect to cart
            return res.redirect('/cart');
        })
        .catch((err) => {
            console.log(err);
        });

    },
    dismiss: (req, res) => {
        //Modal is closed in the JS file
        req.app.cartFlag = 1;

        res.redirect('/');
	},
    include: (req, res) => {
        //Modal is closed in the JS file
		req.app.cartFlag = 1;
        //JSON
        //let allCart = Cart.findAll();
        //MySQL
        db.Carrito.findAll()
        .then((allCart) => {
            //Think of better implementation

            //For getting the index inside a for...of
            //const [index, item] of allCart.entries()
            for(item of allCart){
                //Determine if item in user cart exists in guest cart too
                let exists = allCart.find(element => element.usuario_id == 0 && item.producto_id == element.producto_id && item.usuario_id == req.session.userLogged.id);
                let index = allCart.findIndex(element => element.usuario_id == 0 && item.producto_id == element.producto_id && item.usuario_id == req.session.userLogged.id);
                if(exists) {
                    item.quantity = item.quantity + exists.quantity;
                    allCart.splice(index, 1);
                }
            }

            //Assign missing guest elements (new) to current user
            for(item of allCart){
                if(item.usuario_id == 0){
                    item.usuario_id = req.session.userLogged.id;
                }
            }

            //JSON
            //Cart.updateAll(allCart);
            //MySQL
            db.Carrito.update(allCart)
            .then(() => {
                //Notify user about cart item deletion
                let notification = {activo: 1, accion: "integración", accionDos: "integrado", elemento: "elementos del carrito de invitado", nombre: 'Carrito de invitado', tipo: "bg-success"};

                req.app.notification = notification;

                res.redirect('/');
            })
            .catch((err) => {
                console.log(err);
            });
        })
        .catch((err) => {
            console.log(err);
        });

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

	},
    delete: (req, res) => {
		let id = parseInt(req.params.id); //Id del elemento del carrito de compras, no del producto

        //No need to validate the user profile, because we are using DB id's and they're unique

        //let userId = req.body.session.userLogged.id;
        //JSON
        //let elemento = Cart.findByPk(id);
        //MySQL
        db.Carrito.findByPk(id)
        .then((elemento) => {
            if(elemento != undefined){
                return Promise.resolve(elemento);
            }
            return Promise.reject();
        })
        .then((elemento) => { //If true -> Continue
            //JSON
            //let producto = Product.findByPk(elemento.product_id);
            //MySQL
            let producto = db.Producto.findByPk(elemento.producto_id);

            //Cart.deleteByItemAndUser(id, userId);
            //JSON
            //Cart.delete(id);
            //MySQL
            let carDel = db.Carrito.delete({ where: { id: id }});

            Promise.all([producto, carDel])
            .then(([producto, carDel]) => {
                //Notify user about cart item deletion
                let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "elemento del carrito", nombre: producto.name, tipo: "bg-danger"};

                req.app.notification = notification;

                res.redirect('/cart');
            })
            .catch((err) => {
                console.log(err);
            });

        }, () => { //If false -> Redirect to cart
            return res.redirect('/cart');
        })
        .catch((err) => {
            console.log(err);
        });

	},
};

module.exports = shoppingController;
