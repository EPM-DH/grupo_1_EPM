//Models for JSON
//const Wishlist = require('../models/Wishlist');
//const Product = require('../models/Product');

const { validationResult } = require('express-validator');

//Model for MySQL
const db = require('../database/models');
const Op = db.Sequelize.Op;

const wishlistController = {
    retrieveWishlist: (req, res) => {
        let breadcrumbList = ["Página de inicio", "Listas de deseos"];
        let urlList = [""];
        urlList.push(req.originalUrl);

        let notification = '';

		if(req.app.notification){
			notification = req.app.notification;
            req.app.notification = undefined;
		}

        let userId = parseInt(req.session.userLogged.id);

        //JSON
        //let lists = Wishlist.findAllByField('user_id', userId);
        //MySQL
        db.Lista_de_deseo.findAll({where: { usuario_id: userId }, include: ['visibilidad', 'productosL']})
        .then((lists) => {
            /*let productos = [];

            for(list of lists) {
                for(producto of list.products){
                    let product = Product.findByPk(producto);
                    productos.push(product);
                }
                list.products = productos;
                productos = [];
            }*/

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

            res.render('wishlists/wishlist', { lists, breadcrumbList, urlList, notification, errors, old, ident });
        })
        .catch((err) => {
            console.log(err);
        });

    },
    create: (req, res) => {
		const errors = validationResult(req);
        let productId = parseInt(req.params.id);

		if(errors.isEmpty()){ //No hay errores
            let identifier = req.body.name.toLowerCase().substring(0, 3);
            let userId = req.session.userLogged.id;

			//Create new wishlist from form data
			let newWishlist = { //Validate if identifier is unique
                usuario_id: parseInt(userId),
                image: 'default.png',
                identifier: identifier + userId + '_', 
                visibility_id: parseInt(req.body.status),
                name: req.body.name,
			};

			//Add new list
            //JSON
			//Wishlist.create(newWishlist);
            //MySQL
            db.Lista_de_deseo.create({...newWishlist})
            .then(async (lista) => {
                let listId = lista.id;
                
                let newList = {
                    ...lista.dataValues,
                    identifier: lista.identifier + listId,
                };

                await db.Lista_de_deseo.update(newList, { where: { id: listId }});

                //Notify user about new list creation
                let notification = {activo: 1, accion: "creación", accionDos: "creado", elemento: "lista", nombre: req.body.name, tipo: "bg-success"};

                req.app.notification = notification;

                if(productId == 0) {
                    return Promise.reject();
                } else {
                    return Promise.resolve();
                }
            })
            .then(() => { //If true -> Redirect to the product detail
                res.redirect('/product/' + productId); 
            }, () => { //If false -> Redirect to the wishlist
                res.redirect('/wishlist');
            })
            .catch((err) => {
                console.log(err);
            });

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

        //JSON
        //let list = Wishlist.findByField('identifier', listIdentifier);
        //let producto = Product.findByPk(id);
        //MySQL
        let lista = db.Lista_de_deseo.findAll({ where: { identifier: listIdentifier }});
        let product = db.Producto.findByPk(id);

        Promise.all([lista, product])
        .then(([list, producto]) => {
            if(producto != undefined){
                return Promise.resolve([list, producto]);
            }
            return Promise.reject();
        })
        .then(([list, producto]) => { //If true -> Continue 
            //Notify user about wishlist action
            let notification = {activo: 1, accion: "agregación", accionDos: "agregado", elemento: "elemento de la wishlist", nombre: producto.name, tipo: "bg-success"};

            let wishId = parseInt(listIdentifier[3]);

            //Si ya existe en la wishlist
            db.Productos_Lista_de_deseos.count({ where: { [Op.and]: [
                {producto_id: id},
                {lista_de_deseo_id: wishId}
            ] }})
            .then((number) => {
                if(number != 0){
                    return Promise.reject();
                }
                return Promise.resolve();
            })
            .then(() => { //If true -> Continue
                req.app.notification = notification;

                //JSON
                //Wishlist.update(list);
                //MySQL
                db.Productos_Lista_de_deseos.create({producto_id: id, lista_de_deseo_id: wishId})
                .then(() => {
                    res.redirect('/product/' + id);
                })
                .catch((err) => {
                    console.log(err);
                });

            }, () => { //If false -> Redirect to product detail page
                notification = {activo: 1, accion: "error", accionDos: "ya existe en la wishlist", elemento: "inclusión de elemento a la wishlist", nombre: producto.name, tipo: "bg-warning"};

                req.app.notification = notification;

                return res.redirect('/product/' + id);
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
    update: (req, res) => {
        const errors = validationResult(req);
        let id = parseInt(req.params.id); //Id de la lista a editar 

        //JSON
        //let list = Wishlist.findByPk(id);
        //MySQL
        db.Lista_de_deseo.findByPk(id)
        .then((list) => {
            //If id was modified using inspect elements in the form
            if(list != undefined){
                return Promise.resolve(list);
            }
            return Promise.reject();
        })
        .then((list) => { //If true -> Continue
            if(errors.isEmpty()){ //No hay errores
                let nuevaLista = {
                    ...list.dataValues,
                    ...req.body,
                    visibility_id: parseInt(req.body.status)
                }
                
                delete nuevaLista.status;

                //If wishlist exists, update 
                //JSON
                //Wishlist.update(nuevaLista);
                //MySQL
                db.Lista_de_deseo.update(nuevaLista, { where: { id: id }})
                .then(() => {
                    //Notify user about wishlist action
                    let notification = {activo: 1, accion: "edición", accionDos: "editado", elemento: "wishist", nombre: list.name, tipo: "bg-success"};
        
                    req.app.notification = notification;
        
                    res.redirect('/wishlist');
                })
                .catch((err) => {
                    console.log(err);
                });
    
            } else { //Hay errores
                req.app.renErr = errors.mapped();
                req.app.renOld = req.body;
                req.app.ident = list.identifier;
    
                res.redirect('/wishlist');
            }
        }, () => { //If false -> Redirect to wishlist
            return res.redirect('/wishlist');
        })
        .catch((err) => {
            console.log(err);
        });

    },
    deleteItem: (req, res) => {
        let productId = parseInt(req.params.id); //Id del elemento (producto) de la wishlist

        //JSON
        //let producto = Product.findByPk(productId);
        //MySQL
        db.Producto.findByPk(productId)
        .then((producto) => {
            if(producto != undefined){
                return Promise.resolve(producto);
            }
            return Promise.reject();
        })
        .then((producto) => { //If true -> Continue
            let wlId = parseInt(req.query.wishlist);

            //JSON
            //Wishlist.deleteProductFromWishlist(wlId, productId);
            //MySQL
            db.Productos_Lista_de_deseos.destroy({ where: { [Op.and]: [
                {producto_id : productId},
                {lista_de_deseo_id: wlId}
              ] }})
            .then(() => {
                //Notify user about wishlist item deletion
                let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "elemento de la wishlist", nombre: producto.name, tipo: "bg-danger"};
        
                req.app.notification = notification;
        
                res.redirect('/wishlist');
            })
            .catch((err) => {
                console.log(err);
            });
    
        }, () => { //If false -> Redirect to wishlist page
            return res.redirect('/wishlist');
        })
        .catch((err) => {
            console.log(err);
        });

	},
    delete: (req, res) => {
        let listId = parseInt(req.params.id); //Id de la lista a eliminar de la wishlist

        //JSON
        //let list = Wishlist.findByPk(listId);
        //MySQL
        db.Lista_de_deseo.findByPk(listId)
        .then((list) => {
            if(list != undefined){
                return Promise.resolve(list);
            }
            return Promise.reject();
        })
        .then((list) => { //If true -> Continue  
            //JSON
            //Wishlist.delete(listId);
            //MySQL
            let listaPivot = db.Productos_Lista_de_deseos.destroy({ where: { lista_de_deseo_id: listId }});
            let lista = db.Lista_de_deseo.destroy({ where: { id: listId }});

            Promise.all([listaPivot, lista])
            .then(() => {
                //Notify user about wishlist item deletion
                let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "lista de la wishlist", nombre: list.name, tipo: "bg-danger"};

                req.app.notification = notification;

                res.redirect('/wishlist');
            })
            .catch((err) => {
                console.log(err);
            });

        }, () => { //If false -> Redirect to wishlist
            res.redirect('/wishlist');
        })
        .catch((err) => {
            console.log(err);
        });

	},
};

module.exports = wishlistController;