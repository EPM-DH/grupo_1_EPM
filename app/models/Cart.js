const fs = require('fs');
const path = require('path');

//Don't use arrow functions, it doesn't support them
const Cart = {
    cartFilePath: path.join(__dirname, '../data/carrito.json'), //Fixed, hence no need to make it a function

    getData: function() { //Dynamic, each time the function is called new elements can appear due to previous modifications
        return JSON.parse(fs.readFileSync(this.cartFilePath, 'utf-8'));
    },

    generateId: function() {
        let allItems = this.findAll();
        let lastItem = allItems.pop();
        if(lastItem) {
            return lastItem.id + 1;
        }
        return 1;
    },

    findAll: function () {
        return this.getData();
    },

    findByPk: function(id) {
        let allItems = this.findAll();
        let itemFound = allItems.find(cart => cart.id === id);
        return itemFound;
    },

    findByField: function(field, text) {
        let allItems = this.findAll();
        let itemFound = allItems.find(cart => cart[field] === text);
        return itemFound;
    },

    create: function(itemData) {
        let allItems = this.findAll();
        let newItem = {
            id: this.generateId(),
            ...itemData
        };
        allItems.push(newItem);
        fs.writeFileSync(this.cartFilePath, JSON.stringify(allItems, null, ' '));
        return true;
    },

    update: function(itemData) {
        let allItems = this.findAll();
        let index = allItems.findIndex(element => element.id == itemData.id);
		allItems[index] = itemData;
        fs.writeFileSync(this.cartFilePath, JSON.stringify(allItems, null, ' '));
        return true;
    },

    delete: function(id) {
        let allItems = this.findAll();
        let finalItems = allItems.filter(usuario => usuario.id !== id);
        fs.writeFileSync(this.cartFilePath, JSON.stringify(finalItems, null, ' '));
        return true;
    },
};

module.exports = Cart;