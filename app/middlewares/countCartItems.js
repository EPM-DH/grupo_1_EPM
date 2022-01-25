//To count the number of items in the users shopping cart

//Models for JSON
//const Cart = require('../models/Cart');

//Model for MySQL
const db = require('../database/models');

function cartItems(req, res, next) {
    let user = 0;

    if(req.session.userLogged){
        user = req.session.userLogged.id;
    }

    //JSON
    //let currentCart = Cart.findAllByField('user_id', user);
    //MySQL
    db.Carrito.findAll({ where: { usuario_id: user }})
    .then((currentCart) => {
        let countItems = 0;

        for(item of currentCart) {
            countItems += item.quantity;
        }
    
        res.locals.countItems = countItems;
    
        next();        
    })
    .catch((err) => {
        console.log(err);
    });

}

module.exports = cartItems;