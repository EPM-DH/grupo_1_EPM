const express = require('express');
const app = express();
const path = require('path');
const port = 3500;
const publicPath = path.resolve(__dirname, './public');
const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');
const searchRouter = require('./routes/search');
const productRouter = require('./routes/product');

app.use (express.static(publicPath));
app.use('/', mainRouter);
app.use('/register', userRouter);
app.use('/searchresult', searchRouter); //Consider changing into main router
app.use('/product', productRouter);
app.set("view engine", "ejs");

app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));

//Create route and controller to orderProcessing
app.get('/shoppingcart', (req, res)=> {
    res.render('shoppingcart');
});

app.use((req, res, next) => {
    res.status(404).render('not-found');
});