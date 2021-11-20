const express = require('express');
const bodyParser = require('body-parser'); /* Bodyparser lo usaré para hacer el handling de los POST */
const urlencodedParser = bodyParser.urlencoded ({ extended: false }); /* url encoder lo uso para hacer strings los datos de los post */
const app = express();
const path = require('path');
const port = 3500;
const publicPath = path.resolve(__dirname, './public');
app.use (express.static(publicPath));
app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
app.get('/', (req, res)=> {
    res.sendFile(path.resolve(__dirname,'./views/home.html'));
}); 
app.get('/register', (req, res)=> {
    res.sendFile(path.resolve(__dirname,'./views/register.html'));
});
app.get('/login', (req,res)=> {
    res.sendFile(path.resolve(__dirname,'./views/login.html'));
});
app.get('/shoppingcart', (req, res)=> {
    res.sendFile(path.resolve(__dirname,'./views/shoppingcart.html'));
});
app.get('/details', (req, res)=> {
    res.sendFile(path.resolve(__dirname,'./views/details.html'));
});
app.get('/searchresult', (req, res)=> {
    res.sendFile(path.resolve(__dirname,'./views/searchresult.html'));
});
app.post('/searchresult', urlencodedParser, function(req, res) {
    console.log(req.body);
    console.log("Funcionó");
    res.redirect('/searchresult');
})
app.post('/register', urlencodedParser, function(req, res) {
    console.log(req.body);
    console.log("Funcionó el registro");
    res.redirect('/');
})