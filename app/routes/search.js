const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser'); /* Bodyparser lo usaré para hacer el handling de los POST */
const urlencodedParser = bodyParser.urlencoded ({ extended: false }); /* url encoder lo uso para hacer strings los datos de los post */

router.get('/', (req, res)=> {
    res.sendFile(path.resolve(__dirname,'../views/searchresult.html'));
});

router.post('/', urlencodedParser, function(req, res) {
    console.log(req.body);
    console.log("Funcionó");
    res.redirect('/searchresult');
});

module.exports = router;