
//Models
const Order = require('../models/Order');
const Product = require('../models/Product');

const orderController = {
    retrieveOrders: (req, res) => {
        let breadcrumbList = ["Página de inicio", "Pedidos"];
        let urlList = [""];
        urlList.push(req.originalUrl);

        let userId = parseInt(req.session.userLogged.id);

        let orders = Order.findAllByField('user_id', userId);

        for(order of orders) {
            let product = Product.findByPk(order.product_id);
            order.image = product.image;
            order.name = product.name;
            order.identifier = product.identifier;
            order.shortDescription = product.shortDescription;
            order.total = product.price;
        }

        res.render('users/orders', { orders, breadcrumbList, urlList });
    },
};

module.exports = orderController;