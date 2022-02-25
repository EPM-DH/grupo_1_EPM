//Model for MySQL
const db = require('../../database/models');

const userController = {
    allUsers: (req, res) => {
        let page = parseInt(req.query.page);
        if(page) {
            let elementsPerPage = 10;
            db.Usuario.findAll({offset: (page - 1)*elementsPerPage, limit: elementsPerPage})
            .then(async (usuario) => {
                if(usuario){
                    //Arrange user data into desired format
                    let usuarios = [];
                    for(user of usuario){ 
                        usuarios.push({
                            id : user.id,
                            name : user.firstName + ' ' + user.lastName,
                            email : user.email,
                            detail : 'http://localhost:3500/api/v2/user/' + user.id,
                        });
                    }

                    let count = await db.Usuario.count();
                    let pages = Math.ceil(count/10);
                    let nextPage = '';
                    let previousPage = '';
                    if(page + 1 < pages){
                        nextPage = 'http://localhost:3500/api/v2/user?page=' + (page + 1);
                    } else {
                        nextPage = null;
                    } 

                    if(page - 1 > 0){
                        previousPage = 'http://localhost:3500/api/v2/user?page=' + (page - 1);
                    } else {
                        previousPage = null;
                    }

                    res.status(200).json({ 
                        count: count,
                        users: usuarios,
                        next: nextPage,
                        previous: previousPage,
                    });
                } else {
                    res.status(200).json({ data: "No hay ningún usuario registrado actualmente" });
                }
            })
            .catch((e) => {
                console.log(e);
            });
        } else {
            db.Usuario.findAll()
            .then((usuario) => {
                if(usuario){
                    //Arrange user data into desired format
                    let usuarios = [];
                    for(user of usuario){ 
                        usuarios.push({
                            id : user.id,
                            name : user.firstName + ' ' + user.lastName,
                            email : user.email,
                            detail : 'http://localhost:3500/api/v2/user/' + user.id,
                        });
                    }

                    res.status(200).json({ 
                        count: usuario.length,
                        users: usuarios,
                    });
                } else {
                    res.status(200).json({ data: "No hay ningún usuario registrado actualmente" });
                }
            })
            .catch((e) => {
                console.log(e);
            });
        }
	},
    userDetail: (req, res) => {
        console.log("Hola");
        let id = req.params.id;
		db.Usuario.findByPk(id)
        .then((usuario) => {
            if(usuario){
                res.status(200).json({ 
                    id : usuario.id,
                    name : usuario.firstName + ' ' + usuario.lastName,
                    email : usuario.email,
                    avatar : 'http://localhost:3500/img/users/' + usuario.avatar, 

                 });
            } else {
                res.status(200).json({ data: "No hay ningún usuario con ese id" });
            }
        })
        .catch((e) => {
            console.log(e);
        });
	},
	email: (req, res) => {
		db.Usuario.findOne({ where: { email: req.query.email }})
        .then((usuario) => {
            if(usuario){
                res.status(200).json({ email: usuario.email });
            } else {
                res.status(200).json({ email: undefined });
            }
        })
        .catch((e) => {
            console.log(e);
        });
	},
};

module.exports = userController;