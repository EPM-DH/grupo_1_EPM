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

    findAllNonAdmins: function () {
        let allUsers = this.findAll();
        let usersFound = allUsers.filter(user => user.rol !== 'administrador');
        return usersFound;
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

    findIndexById: function(id) {
        let allUsers = this.findAll();
        let indexFound = allUsers.findIndex(element => element.id === id);
        return indexFound;
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

    update: function(userData, id) {
        let allUsers = this.findAll();
        let newUser = {
            id: id,
            ...userData
        };

        let index = this.findIndexById(id);
		allUsers[index] = newUser;

        fs.writeFileSync(this.usersFilePath, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },

    deleteImageByName: function(name) {
        //Destroy image saved by multer
		fs.unlinkSync(path.join(__dirname, '/../public/img/users', name), (err) => {
            if (err) {
                console.error(err);
                return;
            }
        
            console.log('File removed successfully');
        });

        return true;
    },

    delete: function(id) {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(usuario => usuario.id !== id);

        let index = this.findIndexById(id);

        //Destroy image saved by multer
		fs.unlinkSync(path.join(__dirname, '/../public/img/users', allUsers[index].avatar), (err) => {
			if (err) {
			  console.error(err);
			  return;
			}
		  
			console.log('File removed successfully');
		});

        fs.writeFileSync(this.usersFilePath, JSON.stringify(finalUsers, null, ' '));
        return true;
    },
};

module.exports = User;