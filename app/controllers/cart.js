//Models for JSON
//const Product = require('../models/Product');
//const Cart = require('../models/Cart');
//const Wishlist = require('../models/Wishlist');

//Model for MySQL
const db = require('../database/models');
const Op = db.Sequelize.Op;

//For using JQuery in Node (express)
/*var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('home')).window;
global.document = document;

var $ = jQuery = require('jquery')(window);*/

const shoppingController = {
	getCart: async (req, res) => {
        let breadcrumbList = ["Página de inicio", "Carrito"];
        let urlList = [""];
        urlList.push(req.originalUrl);

        let products = [];
        //let user_id = 0;
        //let cart;

        if(req.session.userLogged) { //Si hay una sesión activa
            await db.Producto.findAll({include: [{model: db.Carrito, as: 'carritos', where: { usuario_id: req.session.userLogged.id }}, 'categories']})
            .then((productos) => {
                productos.forEach(producto => products.push(producto));
            })
            .catch((err) => {
                console.log(err);
            });

        } else { //Si no hay sesión activa (sesión de invitado)
            if(req.cookies.cart){
                let cart = req.cookies.cart;
                const prods = await Promise.all(cart.map(item => db.Producto.findByPk(item.producto_id, {include: ['categories']})));
                products = prods.map((p, index) => ({...p.dataValues, carritos: [cart[index]]}));
            }            

            /*if(cart){
                for(item of cart){
                    db.Producto.findByPk(item.producto_id, {include: ['categories']})
                    .then((product) => {
                        products.push({...product.dataValues, carritos: [...cart]});
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }
            }*/
        }

        //If we don't want to use the carrito[0] in the view we could map all the data here, but that might be unefficient
        let notification = '';

        if(req.app.notification){
            notification = req.app.notification;
            req.app.notification = undefined;
        }

        res.render('cart/cart', {notification, products, breadcrumbList, urlList});

        /*res.cookie('cart', [{usuario_id: 1, producto_id: 2, quantity: 5}], { maxAge: (3600 * 24) * 1000 });
		console.log(req.cookies.cart);*/

        //JSON
        //cart = Cart.findAllByField('user_id', user_id);
        //MySQL
        /*let carrito = db.Carrito.findAll({where: { usuario_id: user_id }});
        let producto = db.Producto.findAll({include: ['categories']});*/

        //{model: 'Producto', as: 'producto', include: ['categories']}

        /*db.Carrito.findAll({ where: {usuario_id: user_id}, include: {model: db.Producto, as: 'producto', include: [{model: db.Categoria, as: 'categories'}] }})
        .then((products) => {
            let notification = '';

            if(req.app.notification){
                notification = req.app.notification;
            }

            res.render('cart/cart', {notification, products, breadcrumbList, urlList});
        })
        .catch((err) => {
            console.log(err);
        });*/

        /*Promise.all([carrito, producto])
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
        });*/

	},
    addItem: async (req, res) => {
        let productId = parseInt(req.params.id);
        let productName;
        let notification;

        if(req.session.userLogged) {
            //JSON
            //let currentItem = Cart.findByFields('product_id', productId, 'user_id', userId); 
            //MySQL
            db.Producto.findByPk(productId) //Check to see if the product to add in the cart exists 
            .then((producto) => {
                if(producto != undefined){
                    return Promise.resolve(producto);
                } else {
                    console.log("No existe el producto");
                    return Promise.reject();
                }
            })
            .then((producto) => { //If true -> Continue: When there is already a product in the cart for the logged user
                //JSON
                //let productName = Product.findByPk(productId).name;
                //MySQL
                db.Carrito.findOne({ where: { [Op.and]: [
                    {producto_id: productId},
                    {usuario_id: req.session.userLogged.id}
                ] }})
                .then((currentItem) => {
                    let referer = req.headers.referer;
                    let parts = referer.split('/');
                    //To remove http://localhost:3500
                    parts.shift()
                    parts.shift()
                    parts.shift();
                    let location = parts;

                    if(currentItem && req.session.userLogged.id == currentItem.usuario_id) { //Si hay un producto idéntico ya añadido 
                        //y el id del usuario logeado es igual al del producto que está en la BD
                        currentItem.quantity = currentItem.quantity + 1;
                        return Promise.resolve([currentItem, producto, location]);
                    } else {
                        let newItem = {
                            producto_id: productId,
                            usuario_id: req.session.userLogged.id,
                            quantity: 1,
                        };
                        return Promise.reject([newItem, producto, location]);
                    }
                })
                .then(async ([currentItem, producto, location]) => { //If true -> Update the cart
                    let flag = false;
                    //JSON
                    //Cart.update(currentItem);
                    //MySQL
                    await db.Carrito.update(currentItem.dataValues, { where: { id : currentItem.id }})
                    .then(() => {
                        flag = true;
                        console.log("Elemento del carrito actualizado");
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                    if(flag){
                        return Promise.resolve([producto, location]);
                    } else {
                        return Promise.reject();
                    }
                }, async ([newItem, producto, location]) => { //If false -> Create new cart entry
                    console.log(newItem);
                    let flag = false;
                    //JSON
                    //Cart.create(newItem);
                    await db.Carrito.create(newItem)
                    .then(() => {
                        flag = true;
                        console.log("Nuevo elemento añadido al carrito");
                    })
                    .catch((err) => {
                        console.log(err);
                    });

                    if(flag){
                        return Promise.resolve([producto, location]);
                    } else {
                        return Promise.reject();
                    } 
                })
                .then(([producto, location]) => { //Avanzar
                    productName = producto.name;
                    //Notify user about new product creation
                    notification = {activo: 1, accion: "agregación", accionDos: "añadido", elemento: "producto al carrito", nombre: productName, tipo: "bg-success"};

                    req.app.notification = notification;

                    console.log("Llegué hasta aquí");
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
        } else {
            try {
                productName = await db.Producto.findByPk(productId);    
            } catch (error) {
                console.log(error);
            }

            if(productName){
                let referer = req.headers.referer;
                let parts = referer.split('/');
                //To remove http://localhost:3500
                parts.shift()
                parts.shift()
                parts.shift();
                let location = parts;

                let items = req.cookies.cart;
                console.log(items);
                let currentItem;
                let newItem;
                if(items){
                    currentItem = items.find(item => item.producto_id == productId);
                    if(currentItem) { //Si hay un producto idéntico ya añadido 
                        //y el id del usuario logeado es igual al del producto que está en la BD
                        currentItem.quantity = currentItem.quantity + 1;
                        let index = items.findIndex(element => element.id == currentItem.id);
                        items[index] = currentItem;
                        
                    } else {
                        let all = [...items];
                        let last = all.pop();
                        newItem = {
                            id: last.id + 1,
                            producto_id: productId,
                            usuario_id: 0,
                            quantity: 1,
                        };
                        items.push(newItem);
                    }
                } else {
                    newItem = {
                        id: 1,
                        producto_id: productId,
                        usuario_id: 0,
                        quantity: 1,
                    };
                    items = [newItem];
                }

                console.log(items);

                res.cookie('cart', items, { maxAge: (3600 * 24) * 1000 });

                //Notify user about new product creation
                notification = {activo: 1, accion: "agregación", accionDos: "añadido", elemento: "producto al carrito", nombre: productName.name, tipo: "bg-success"};

                req.app.notification = notification;

                if(location == '') {
                    res.redirect('/');
                } else if (location.length == 1){
                    res.redirect('/' + location);
                } else {
                    let output = '';
                    for(it of location) { 
                        output += '/' + it; 
                    }
                    res.redirect(output);
                }
                
            } else {
                res.redirect('/product');
            }

        }

    },
    increaseItem: async (req, res) => {
        let cartId = parseInt(req.params.id);
        let productName;

        if(req.session.userLogged){
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
                productName = db.Producto.findByPk(currentItem.producto_id);
                currentItem.quantity = currentItem.quantity + 1;
                //JSON
                //Cart.update(currentItem);
                //MySQL
                let carrito = db.Carrito.update(currentItem.dataValues, { where: { id: currentItem.id }});

                Promise.all([productName, carrito])
                .then(([productName, carrito]) => {
                    //Notify user about new product creation
                    let notification = {activo: 1, accion: "agregación", accionDos: "añadido", elemento: "un producto al carrito", nombre: productName.name, tipo: "bg-success"};

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
        } else {
            let items = req.cookies.cart;
            let currentItem = items.find(item => item.id == cartId); 
            console.log(currentItem);

            if(currentItem == undefined){
                return res.redirect('/cart');
            }

            try {
                productName = await db.Producto.findByPk(currentItem.producto_id);    
            } catch (error) {
                console.log(error);
            }

            currentItem.quantity = currentItem.quantity + 1;
            let index = items.findIndex(element => element.id == currentItem.id);
            items[index] = currentItem;

            res.cookie('cart', items, { maxAge: (3600 * 24) * 1000 });

            //Notify user about new product creation
            let notification = {activo: 1, accion: "agregación", accionDos: "añadido", elemento: "un producto al carrito", nombre: productName.name, tipo: "bg-success"};

            req.app.notification = notification;

            res.redirect('/cart');
        }
        
    },
    decreaseItem: async (req, res) => {
        let cartId = parseInt(req.params.id);
        let productName;

        if(req.session.userLogged){
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
                        db.Carrito.update(currentItem.dataValues, { where: { id: currentItem.id }})
                        .then(() => {
                            //Notify user about new product creation
                            let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "un producto del carrito", nombre: productName.name, tipo: "bg-danger"};

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
        } else {
            let items = req.cookies.cart;
            let currentItem = items.find(item => item.id == cartId); 
            console.log(currentItem);

            if(currentItem == undefined){
                return res.redirect('/cart');
            }

            try {
                productName = await db.Producto.findByPk(currentItem.producto_id);    
            } catch (error) {
                console.log(error);
            }

            currentItem.quantity = currentItem.quantity - 1;
            let index = items.findIndex(element => element.id == currentItem.id);
            items[index] = currentItem;

            res.cookie('cart', items, { maxAge: (3600 * 24) * 1000 });

            //Notify user about new product creation
            let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "un producto del carrito", nombre: productName.name, tipo: "bg-danger"};

            req.app.notification = notification;

            res.redirect('/cart');
        }
        

    },
    dismiss: (req, res) => {
        //Modal is closed in the JS file
        req.app.cartFlag = 1;

        res.redirect('/');
	},
    include: async (req, res) => {
        //For when a user creates its account or logs into his/her account. So he/she can ask the user to integrate its guest cart into his account cart

        //Modal is closed in the JS file
		req.app.cartFlag = 1;
        let userId = req.session.userLogged.id;
        let items = req.cookies.cart;
        /*console.log("Cart of cookie");
        console.log(items);*/

        for(item of items) {
            /*console.log("Item to be added");
            console.log(item);*/
            let elemento;
            try {
                elemento = await db.Carrito.findOne({where: { usuario_id: userId, producto_id: item.producto_id }});
            } catch (error) {
                console.log(error);
            }
            /*console.log("Item in DB");
            console.log(elemento);*/
            if(elemento) {
                //console.log("Existo");
                elemento.quantity += item.quantity;
                /*console.log("Elemento a actualizar");
                console.log(elemento);*/
                try {
                    await db.Carrito.update(elemento.dataValues, {where: { id: elemento.id }});
                } catch (error) {
                    console.log(error);
                }   
            } else {
                //console.log("Soy nuevo");
                item.usuario_id = userId;
                delete item.id;
                /*console.log("Elemento a añadir");
                console.log(item);*/
                try {
                    await db.Carrito.create(item);
                } catch (error) {
                    console.log(error);
                }   
            }
        }

        res.clearCookie('cart');

        //Notify user about cart item deletion
        let notification = {activo: 1, accion: "integración", accionDos: "integrado", elemento: "elementos del carrito de invitado", nombre: 'Carrito de invitado', tipo: "bg-success"};

        req.app.notification = notification;

        res.redirect('/');

        //JSON
        //let allCart = Cart.findAll();
        //MySQL
        /*db.Carrito.findAll()
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
        });*/

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
    delete: async (req, res) => {
		let id = parseInt(req.params.id); //Id del elemento del carrito de compras, no del producto

        //No need to validate the user profile, because we are using DB id's and they're unique

        if(req.session.userLogged){
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
                let carDel = db.Carrito.destroy({ where: { id: id }});

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
        } else {
            let items = req.cookies.cart;
            let itemFound = items.find(cart => cart.id === id);

            if(itemFound == undefined){
                return res.redirect('/cart');
            }

            try {
                producto = await db.Producto.findByPk(itemFound.producto_id);    
            } catch (error) {
                console.log(error);
            }

            let finalItems = items.filter(cart => cart.id !== id);

            res.cookie('cart', finalItems, { maxAge: (3600 * 24) * 1000 });

            //Notify user about cart item deletion
            let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "elemento del carrito", nombre: producto.name, tipo: "bg-danger"};

            req.app.notification = notification;

            res.redirect('/cart');
        }

	},
};

module.exports = shoppingController;
