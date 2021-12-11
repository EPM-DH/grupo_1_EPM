const express = require('express');
const app = express();
const path = require('path');
const port = 3500;
const publicPath = path.resolve(__dirname, './public');
const mainRouter = require('./routes/main');
const registerRouter = require('./routes/register');
const searchRouter = require('./routes/search');
const productRouter = require('./routes/product');

app.use (express.static(publicPath));
app.use((req, res, next) => {
    res.status(404).render('not-found');
})
app.use('/', mainRouter);
app.use('/register', registerRouter);
app.use('/searchresult', searchRouter);
app.use('/product', productRouter);
app.set("view engine", "ejs");

app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));

app.get('/login', (req,res)=> {
    res.render('login');
});

app.get('/shoppingcart', (req, res)=> {
    res.render('shoppingcart');
});

app.get('/details', (req, res)=> {
    res.sendFile(path.resolve(__dirname,'./views/details.html'));
});