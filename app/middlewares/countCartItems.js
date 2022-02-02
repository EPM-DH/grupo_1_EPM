//To count the number of items in the users shopping cart

//Models for JSON
//const Cart = require('../models/Cart');

//Model for MySQL
const db = require('../database/models');

function cartItems(req, res, next) {
    let countItems = 0;
    if(req.session.userLogged){
        //JSON
        //let currentCart = Cart.findAllByField('user_id', user);
        //MySQL
        db.Carrito.findAll({ where: { usuario_id: req.session.userLogged.id }})
        .then((currentCart) => {

            for(item of currentCart) {
                countItems += item.quantity;
            }
        
            res.locals.countItems = countItems;
        
            next();        
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        let items = req.cookies.cart;

        if(items){
            for(item of items) {
                countItems += item.quantity;
            }
        }

        res.locals.countItems = countItems;
    
        next();    
    }

}

module.exports = cartItems;