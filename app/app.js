const express = require('express');
const app = express();
const cookieParser = require('cookie-parser'); //Se guarda del lado del cliente
const path = require('path');
const port = 3500;
const publicPath = path.resolve(__dirname, './public');
const methodOverride = require('method-override');
//For session
const session = require('express-session'); //Se guarda del lado del servidor
const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');
const searchRouter = require('./routes/search');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/order');
const wishlistRouter = require('./routes/wishlist');
const userLogged = require('./middlewares/userLogged');
const userActivity = require('./middlewares/userActivity'); //Only needed when working with JSON files
const logger = require('./middlewares/logger'); //Only needed when working with JSON files
const cartItems = require('./middlewares/countCartItems'); //Only needed when working with JSON files

app.use(express.static(publicPath));
app.use(methodOverride('_method')); // For PUT and DELETE methods
app.use(express.urlencoded({ extended: false })); //To be able to retrieve the forms data in the req element
app.use(express.json()); //To be able to retrieve the forms data in the req element
//For session
app.use(session({ secret: "Nuestro mensaje secreto", //Debe ir antes de que se ejecute el middleware que utiliza la sesión (userLogged)
                  resave: false,
                  saveUninitialized: false }));
app.use(cookieParser()); 
app.use(userActivity); //Only needed when working with JSON files
app.use(userLogged);
app.use(logger);
app.use(cartItems);
app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/search', searchRouter); //Consider changing into main router
app.use('/product', productRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/wishlist', wishlistRouter); 
app.set("view engine", "ejs");

app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));

app.use((req, res, next) => {
    res.status(404).render('not-found');
});