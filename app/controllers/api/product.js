//Model for MySQL
const db = require('../../database/models');

const productController = {
    allProducts: (req, res) => {
		db.Producto.findAll({include: ['categories']})
        .then((producto) => {
            if(producto){
                //Arrange product data into desired format
                let productos = [];
                for(product of producto){ 
                    productos.push({
                        id : product.id,
                        name : product.firstName + ' ' + product.lastName,
                        description: product.shortDescription,
                        categories: product.categories,
                        detail : 'http://localhost:3500/api/v2/product/' + product.id,
                    });
                }

                res.status(200).json({ 
                    count: producto.length,
                    countByCategory: 1,
                    products: productos,
                 });
            } else {
                res.status(200).json({ data: "No hay ningún producto registrado actualmente" });
            }
        })
        .catch((e) => {
            console.log(e);
        });
	},
    productDetail: (req, res) => {
        let id = req.params.id;
		db.Producto.findByPk(id, {include: ['categories']})
        .then((producto) => {
            if(producto){
                res.status(200).json({ 
                    id : product.id,
                    name : product.firstName + ' ' + product.lastName,
                    description: product.shortDescription,
                    categories: product.categories,
                    detail : 'http://localhost:3500/api/v2/product/' + product.id, //Change for the real one??????????????????????

                 });
            } else {
                res.status(200).json({ data: "No hay ningún producto con ese id" });
            }
        })
        .catch((e) => {
            console.log(e);
        });
	},
};

module.exports = productController;