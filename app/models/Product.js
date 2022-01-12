const fs = require('fs');
const path = require('path');

//Don't use arrow functions, it doesn't support them
const Product = {
    productsFilePath: path.join(__dirname, '../data/productos.json'), //Fixed, hence no need to make it a function

    getData: function() { //Dynamic, each time the function is called new elements can appear due to previous modifications
        return JSON.parse(fs.readFileSync(this.productsFilePath, 'utf-8'));
    },

    generateId: function() {
        let allProducts = this.findAll();
        let lastProduct = allProducts.pop();
        if(lastProduct) {
            return lastProduct.id + 1;
        }
        return 1;
    },

    findAll: function () {
        return this.getData();
    },

    findByPk: function(id) {
        let allProducts = this.findAll();
        let productFound = allProducts.find(product => product.id === id);
        return productFound;
    },

    findByField: function(field, text) {
        let allProducts = this.findAll();
        let productFound = allProducts.find(product => product[field] === text);
        return productFound;
    },

    findIndexById: function(id) {
        let allProducts = this.findAll();
        let indexFound = allProducts.findIndex(element => element.id === id);
        return indexFound;
    },

    findFeatured: function() {
        let products = this.findAll();
        let featuredProducts = products.filter(producto => producto.featured != 0);

        return featuredProducts;
    },

    search: function(toSearch) {
        let products = this.findAll();
        let foundProducts = products.filter(item => item.name.toLowerCase().includes(toSearch.toLowerCase()));

        return foundProducts;
    },

    create: function(productData) {
        let allProducts = this.findAll();
        let newProduct = {
            id: this.generateId(),
            ...productData
        };
        allProducts.push(newProduct);
        fs.writeFileSync(this.productsFilePath, JSON.stringify(allProducts, null, ' '));
        return newProduct;
    },

    update: function(productData, id) {
        let allProducts = this.findAll();
        let newProduct = {
            id: id,
            ...productData
        };

        let index = this.findIndexById(id);
		allProducts[index] = newProduct;

        fs.writeFileSync(this.productsFilePath, JSON.stringify(allProducts, null, ' '));
        return newProduct;
    },

    deleteImageByName: function(name) {
        //Destroy image saved by multer
		fs.unlinkSync(path.join(__dirname, '/../public/img/products', name), (err) => {
            if (err) {
                console.error(err)
                return
            }
        
            console.log('File removed successfully');
        });

        return true;
    },

    delete: function(id) {
        let allProducts = this.findAll();
        let finalProducts = allProducts.filter(usuario => usuario.id !== id);

        let index = this.findIndexById(id);

        //Destroy image saved by multer
		fs.unlinkSync(path.join(__dirname, '/../public/img/products', allProducts[index].image), (err) => {
			if (err) {
			  console.error(err);
			  return;
			}
		  
			console.log('File removed successfully');
		});

        fs.writeFileSync(this.productsFilePath, JSON.stringify(finalProducts, null, ' '));
        return true;
    },
};

module.exports = Product;