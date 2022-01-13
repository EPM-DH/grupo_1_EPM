const fs = require('fs');
const path = require('path');

//Don't use arrow functions, it doesn't support them
const Wishlist = {
    wishlistFilePath: path.join(__dirname, '../data/lista_de_deseos.json'), //Fixed, hence no need to make it a function

    getData: function() { //Dynamic, each time the function is called new elements can appear due to previous modifications
        return JSON.parse(fs.readFileSync(this.wishlistFilePath, 'utf-8'));
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
        let itemFound = allItems.find(list => list.id === id);
        return itemFound;
    },

    findByField: function(field, text) {
        let allItems = this.findAll();
        let itemFound = allItems.find(list => list[field] === text);
        return itemFound;
    },

    findByFields: function(field, text, field2, text2) {
        let allItems = this.findAll();
        let itemFound = allItems.find(list => list[field] === text && list[field2] === text2);
        return itemFound;
    },

    findAllByField: function(field, text) {
        let allItems = this.findAll();
        let itemsFound = allItems.filter(list => list[field] === text);
        return itemsFound;
    },
    
    create: function(itemData) {
        let allItems = this.findAll();
        let newItem = {
            id: this.generateId(),
            ...itemData
        };
        allItems.push(newItem);
        fs.writeFileSync(this.wishlistFilePath, JSON.stringify(allItems, null, ' '));
        return true;
    },

    update: function(itemData) {
        let allItems = this.findAll();
        let index = allItems.findIndex(element => element.id == itemData.id);
		allItems[index] = itemData;
        fs.writeFileSync(this.wishlistFilePath, JSON.stringify(allItems, null, ' '));
        return true;
    },

    updateAll: function(itemData) {
        fs.writeFileSync(this.wishlistFilePath, JSON.stringify(itemData, null, ' '));
        return true;
    },

    delete: function(id) {
        let allItems = this.findAll();
        let finalItems = allItems.filter(list => list.id !== id);
        fs.writeFileSync(this.wishlistFilePath, JSON.stringify(finalItems, null, ' '));
        return true;
    },

    deleteCartByUserId: function(userId) {
        let allItems = this.findAll();
        let finalItems = allItems.filter(list => list.user_id !== userId);
        fs.writeFileSync(this.wishlistFilePath, JSON.stringify(finalItems, null, ' '));
        return true;
    },
    
};

module.exports = Wishlist;