//To check if the guest user has items in it's shopping cart, and ask the logged user if he/she wants to add them to their cart

//Models for JSON
//const Cart = require('../models/Cart');

//Model for MySQL
const db = require('../database/models');

function cartItems(req, res, next) {
    let items = req.cookies.cart;

    if(req.session.userLogged && items && !req.app.cartFlag) {
        res.locals.currentCart = 1; 
    }

    next();

    //JSON
    //let currentCart = Cart.findAllByField('user_id', 0);
    //MySQL
    /*db.Carrito.findAll({ where: { usuario_id: 0 }})
    .then((currentCart) => {
        if(req.session.userLogged && currentCart.length > 0 && !req.app.cartFlag) {
            res.locals.currentCart = 1;
        }    
        next();
    })
    .catch((err) => {
        console.log(err);
    });*/

}

module.exports = cartItems;