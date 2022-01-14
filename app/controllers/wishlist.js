//Models
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

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

        res.render('users/wishlist', { lists, breadcrumbList, urlList, notification });
    },
    deleteItem: (req, res) => {
        let productId = parseInt(req.params.id); //Id del elemento (producto) de la wishlist

        let producto = Product.findByPk(productId);

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

        Wishlist.delete(listId);

		//Notify user about wishlist item deletion
		let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "lista de la wishlist", nombre: list.name, tipo: "bg-danger"};

		req.app.notification = notification;

		res.redirect('/wishlist');
	},
};

module.exports = wishlistController;