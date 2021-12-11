const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser'); /* Bodyparser lo usaré para hacer el handling de los POST */
const urlencodedParser = bodyParser.urlencoded ({ extended: false }); /* url encoder lo uso para hacer strings los datos de los post */

router.get('/create', (req, res) => {
    res.render('./products/createProduct');
});

router.get('/edit', (req, res) => {
    res.render('./products/editProduct');
});

module.exports = router;