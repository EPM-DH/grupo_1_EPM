const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productos.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const searchController = {
	/*retrieveSearch: (req, res) => {
        res.render('search/search');
	},*/
    search: (req, res) => {
        let toSearch = req.body.userQuery;
        let product = products.filter(item => item.name.toLowerCase().includes(toSearch.toLowerCase()));

        res.render('search/search', { products: product });
    },
};

module.exports = searchController;