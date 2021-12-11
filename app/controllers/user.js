const userController = {
	retrieveRegister: (req, res) => {
		res.render('register');
	},
    register: (req, res) => {
        console.log(req.body);
        console.log("Funcionó el registro");
        res.redirect('/');
	},
    login: (req, res) => {
		res.render('login');
	},
};

module.exports = userController;
