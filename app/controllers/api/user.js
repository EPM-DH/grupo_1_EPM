//Model for MySQL
const db = require('../../database/models');

const userController = {
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