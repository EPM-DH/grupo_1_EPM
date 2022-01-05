const fs = require('fs');
const path = require('path');

//Don't use arrow functions, it doesn't support them
const User = {
    usersFilePath: path.join(__dirname, '../data/usuarios.json'), //Fixed, hence no need to make it a function

    getData: function() { //Dynamic, each time the function is called new elements can appear due to previous modifications
        return JSON.parse(fs.readFileSync(this.usersFilePath, 'utf-8'));
    },

    generateId: function() {
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();
        if(lastUser) {
            return lastUser.id + 1;
        }
        return 1;
    },

    findAll: function () {
        return this.getData();
    },

    findByPk: function(id) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(user => user.id === id);
        return userFound;
    },

    findByField: function(field, text) {
        let allUsers = this.findAll();
        let userFound = allUsers.find(user => user[field] === text);
        return userFound;
    },

    create: function(userData) {
        let allUsers = this.findAll();
        let newUser = {
            id: this.generateId(),
            ...userData
        };
        allUsers.push(newUser);
        fs.writeFileSync(this.usersFilePath, JSON.stringify(allUsers, null, ' '));
        return true;
    },

    delete: function(id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(usuario => usuario.id !== id);
        fs.writeFileSync(this.usersFilePath, JSON.stringify(finalUsers, null, ' '));
        return true;
    },
};

module.exports = User;