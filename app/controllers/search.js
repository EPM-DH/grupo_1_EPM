//Models for JSON
//const Product = require('../models/Product');

//Model for MySQL
const db = require('../database/models');
const Op = db.Sequelize.Op;

const searchController = {
	/*retrieveSearch: (req, res) => {
        res.render('search/search');
	},*/
    search: (req, res) => {
        let toSearch = (req.body.userQuery).toLowerCase();
        //JSON 
        //let product = Product.search(toSearch); let foundProducts = products.filter(item => item.name.toLowerCase().includes(toSearch.toLowerCase()));
        //MySQL 
        db.Producto.findAll({ where: { name: {[Op.like]: '%' + toSearch + '%'} }, include: ['categories']})
        .then((products) => {
            res.render('search/search', { products });
        })
        .catch((err) => {
            console.log(err);
        });

    },
};

module.exports = searchController;