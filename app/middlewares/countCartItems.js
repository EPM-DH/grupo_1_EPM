//To count the number of items in the users shopping cart

//Models
const Cart = require('../models/Cart');

function cartItems(req, res, next) {
    let user = 0;

    if(req.session.userLogged){
        user = req.session.userLogged.id;
    }

    let currentCart = Cart.findAllByField('user_id', user);

    let countItems = 0;

    for(item of currentCart) {
        countItems += item.quantity;
    }

    res.locals.countItems = countItems;

    next();
}

module.exports = cartItems;