//Model for MySQL
const db = require('../../database/models');

const productController = {
    allProducts: (req, res) => {
        let page = parseInt(req.query.page);
        if(page) {
            let elementsPerPage = 10;
            db.Producto.findAll({include: ['categories'], offset: (page - 1)*elementsPerPage, limit: elementsPerPage})
            .then(async (producto) => {
                if(producto){
                    //Arrange product data into desired format
                    let productos = [];
                    for(product of producto){ 
                        let catego = []
                        let cat = product.categories;
                        for(category of cat){
                            catego.push(category.name);
                        }
    
                        productos.push({
                            id : product.id,
                            name : product.name,
                            description: product.shortDescription,
                            categories: catego,
                            detail : 'http://localhost:3500/api/v2/product/' + product.id,
                        });
                        
                    }
    
                    let categories = await db.Categoria.findAll();
                    let countByCat = [];
    
                    for(category of categories) {
                        let name = category.name;
                        countByCat.push({
                            [name]: await db.Productos_Categorias.count({ where: { categoria_id: category.id }})
                        });
                    }
    
                    let count = await db.Producto.count();
                    let pages = Math.ceil(count/10);
                    let nextPage = '';
                    let previousPage = '';
                    if(page + 1 < pages){
                        nextPage = 'http://localhost:3500/api/v2/product?page=' + (page + 1);
                    } else {
                        nextPage = null;
                    } 

                    if(page - 1 > 0){
                        previousPage = 'http://localhost:3500/api/v2/product?page=' + (page - 1);
                    } else {
                        previousPage = null;
                    }

                    res.status(200).json({ 
                        count: producto.length,
                        countByCategory: countByCat,
                        products: productos,
                        next: nextPage,
                        previous: previousPage,
                     });
                } else {
                    res.status(200).json({ data: "No hay ningún producto registrado actualmente" });
                }
            })
            .catch((e) => {
                console.log(e);
            });
        } else {
            db.Producto.findAll({include: ['categories']})
            .then(async (producto) => {
                if(producto){
                    //Arrange product data into desired format
                    let productos = [];
                    for(product of producto){ 
                        let catego = []
                        let cat = product.categories;
                        for(category of cat){
                            catego.push(category.name);
                        }

                        productos.push({
                            id : product.id,
                            name : product.name,
                            description: product.shortDescription,
                            categories: catego,
                            detail : 'http://localhost:3500/api/v2/product/' + product.id,
                        });
                        
                    }

                    let categories = await db.Categoria.findAll();
                    let countByCat = [];

                    for(category of categories) {
                        let name = category.name;
                        countByCat.push({
                            [name]: await db.Productos_Categorias.count({ where: { categoria_id: category.id }})
                        });
                    }

                    res.status(200).json({ 
                        count: producto.length,
                        countByCategory: countByCat,
                        products: productos,
                    });
                } else {
                    res.status(200).json({ data: "No hay ningún producto registrado actualmente" });
                }
            })
            .catch((e) => {
                console.log(e);
            });
        }
	},
    productDetail: (req, res) => {
        let id = req.params.id;
		db.Producto.findByPk(id, {include: ['categories']})
        .then((producto) => {
            if(producto){
                let catego = []
                let cat = producto.categories;
                for(category of cat){
                    catego.push(category.name);
                }

                res.status(200).json({ 
                    id : producto.id,
                    name : producto.name,
                    description: producto.shortDescription,
                    categories: catego,
                    image : 'http://localhost:3500/img/products/' + producto.image, 

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