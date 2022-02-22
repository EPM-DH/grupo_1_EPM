//Model for MySQL
const db = require('../../database/models');

const userController = {
    allUsers: (req, res) => {
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
	},
    userDetail: (req, res) => {
        let id = req.params.id;
		db.Usuario.findByPk(id)
        .then((usuario) => {
            if(usuario){
                res.status(200).json({ 
                    id : usuario.id,
                    name : usuario.firstName + ' ' + usuario.lastName,
                    email : usuario.email,
                    avatar : 'http://localhost:3500/api/v2/user/' + usuario.avatar, //Change for the real one??????????????????????

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