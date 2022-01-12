const fs = require('fs');
const path = require('path');

//Don't use arrow functions, it doesn't support them
const Order = {
    orderFilePath: path.join(__dirname, '../data/pedidos.json'), //Fixed, hence no need to make it a function

    getData: function() { //Dynamic, each time the function is called new elements can appear due to previous modifications
        return JSON.parse(fs.readFileSync(this.orderFilePath, 'utf-8'));
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
        let itemFound = allItems.find(order => order.id === id);
        return itemFound;
    },

    findByField: function(field, text) {
        let allItems = this.findAll();
        let itemFound = allItems.find(order => order[field] === text);
        return itemFound;
    },

    findByFields: function(field, text, field2, text2) {
        let allItems = this.findAll();
        let itemFound = allItems.find(order => order[field] === text && order[field2] === text2);
        return itemFound;
    },

    findAllByField: function(field, text) {
        let allItems = this.findAll();
        let itemsFound = allItems.filter(order => order[field] === text);
        return itemsFound;
    },
    
    create: function(itemData) {
        let allItems = this.findAll();
        let newItem = {
            id: this.generateId(),
            ...itemData
        };
        allItems.push(newItem);
        fs.writeFileSync(this.orderFilePath, JSON.stringify(allItems, null, ' '));
        return true;
    },

    update: function(itemData) {
        let allItems = this.findAll();
        let index = allItems.findIndex(element => element.id == itemData.id);
		allItems[index] = itemData;
        fs.writeFileSync(this.orderFilePath, JSON.stringify(allItems, null, ' '));
        return true;
    },

    updateAll: function(itemData) {
        fs.writeFileSync(this.orderFilePath, JSON.stringify(itemData, null, ' '));
        return true;
    },

    delete: function(id) {
        let allItems = this.findAll();
        let finalItems = allItems.filter(order => order.id !== id);
        fs.writeFileSync(this.orderFilePath, JSON.stringify(finalItems, null, ' '));
        return true;
    },

    deleteCartByUserId: function(userId) {
        let allItems = this.findAll();
        let finalItems = allItems.filter(order => order.user_id !== userId);
        fs.writeFileSync(this.orderFilePath, JSON.stringify(finalItems, null, ' '));
        return true;
    },
    
};

module.exports = Order;