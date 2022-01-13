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
    delete: (req, res) => {
		let id = parseInt(req.params.id); //Id del elemento del carrito de compras, no del producto

        //No need to validate the user profile, because we are using DB id's and they're unique

        //let userId = req.body.session.userLogged.id;
        let elemento = Cart.findByPk(id);
        let producto = Product.findByPk(elemento.product_id);

		//Cart.deleteByItemAndUser(id, userId);
        Cart.delete(id);

		//Notify user about cart item deletion
		let notification = {activo: 1, accion: "eliminación", accionDos: "eliminado", elemento: "elemento del carrito", nombre: producto.name, tipo: "bg-danger"};

		req.app.notification = notification;

		res.redirect('/cart');
	},
};

module.exports = wishlistController;