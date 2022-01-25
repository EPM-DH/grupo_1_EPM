//Models
const Product = require('../models/Product');

const searchController = {
	/*retrieveSearch: (req, res) => {
        res.render('search/search');
	},*/
    search: (req, res) => {
        let toSearch = req.body.userQuery;
        let product = Product.search(toSearch);

        res.render('search/search', { products: product });
    },
};

module.exports = searchController;