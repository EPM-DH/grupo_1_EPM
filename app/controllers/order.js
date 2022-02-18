//Models for JSON
//const Order = require('../models/Order');
//const Product = require('../models/Product');

//Model for MySQL
const db = require('../database/models');

const orderController = {
    retrieveOrders: (req, res) => {
        let breadcrumbList = ["Página de inicio", "Pedidos"];
        let urlList = [""];
        urlList.push(req.originalUrl);

        let userId = parseInt(req.session.userLogged.id);

        //JSON
        //let orders = Order.findAllByField('user_id', userId);
        //MySQL
        db.Pedido.findAll({ where: { usuario_id: userId }, include: ['producto', 'estatus']})
        .then((orders) => {
            res.render('users/orders', { orders, breadcrumbList, urlList });
        })
        .catch((err) => {
            console.log(err);
        });

    },
};

module.exports = orderController;