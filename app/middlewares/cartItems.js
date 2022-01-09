//To check if the guest user has items in it's shopping cart, and ask the logged user if he/she wants to add them to their cart

//Models
const Cart = require('../models/Cart');

function cartItems(req, res, next) {
    let currentCart = Cart.findAllByField('user_id', 0);
    if(req.session.userLogged && currentCart.length > 0 && !req.app.cartFlag) {
        res.locals.currentCart = 1;
    }    
    next();
}

module.exports = cartItems;