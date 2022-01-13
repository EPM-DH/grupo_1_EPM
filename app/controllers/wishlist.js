//Models
const Wishlist = require('../models/Wishlist');
const Product = require('../models/Product');

const wishlistController = {
    retrieveWishlist: (req, res) => {
        let breadcrumbList = ["Página de inicio", "Lista de deseos"];
        let urlList = [""];
        urlList.push(req.originalUrl);

        let lists = Wishlist.findAll();

        /*let userId = parseInt(req.session.userLogged.id);

        let orders = Order.findAllByField('user_id', userId);

        for(order of orders) {
            let product = Product.findByPk(order.product_id);
            order.image = product.image;
            order.name = product.name;
            order.identifier = product.identifier;
            order.shortDescription = product.shortDescription;
            order.total = product.price;
        }

        console.log(orders);*/

        res.render('users/wishlist', { lists, breadcrumbList, urlList });
    },
};

module.exports = wishlistController;