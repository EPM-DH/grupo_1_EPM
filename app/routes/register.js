const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); /* Bodyparser lo usaré para hacer el handling de los POST */
const urlencodedParser = bodyParser.urlencoded ({ extended: false }); /* url encoder lo uso para hacer strings los datos de los post */

router.get('/', (req, res)=> {
    res.render('register');
});

router.post('/', urlencodedParser, function(req, res) {
    console.log(req.body);
    console.log("Funcionó el registro");
    res.redirect('/');
});

module.exports = router;