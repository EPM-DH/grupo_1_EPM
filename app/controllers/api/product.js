//Model for MySQL
const db = require('../../database/models');

//Path
const basePath = require('../../app');

const productController = {
    productIdentifier: (req, res) => {
		db.Producto.findOne({ where: { identifier: req.query.identifier }})
        .then((producto) => {
            if(producto){
                res.status(200).json({ producto: producto.identifier });
            } else {
                res.status(200).json({ producto: undefined });
            }
        })
        .catch((e) => {
            console.log(e);
        });
    },
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
                            price: product.price,
                            categories: catego,
                            detail : basePath.basePath + 'api/v2/product/' + product.id,
                            image : basePath.basePath + 'img/products/' + product.image, 
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
                        nextPage = basePath.basePath + 'api/v2/product?page=' + (page + 1);
                    } else {
                        nextPage = null;
                    } 

                    if(page - 1 > 0){
                        previousPage = basePath.basePath + 'api/v2/product?page=' + (page - 1);
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
                    res.status(200).json({ data: "No hay ning??n producto registrado actualmente" });
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
                            price: product.price,
                            categories: catego,
                            detail : basePath.basePath + 'api/v2/product/' + product.id,
                            image : basePath.basePath + 'img/products/' + product.image, 
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
                    res.status(200).json({ data: "No hay ning??n producto registrado actualmente" });
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
                    price: producto.price,
                    categories: catego,
                    image : basePath.basePath + 'img/products/' + producto.image, 

                 });
            } else {
                res.status(200).json({ data: "No hay ning??n producto con ese id" });
            }
        })
        .catch((e) => {
            console.log(e);
        });
	},
};

module.exports = productController;