const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const port = 3500;
const publicPath = path.resolve(__dirname, './public');
const methodOverride = require('method-override');
//const session = require('express-session');
const mainRouter = require('./routes/main');
const userRouter = require('./routes/user');
const searchRouter = require('./routes/search');
const productRouter = require('./routes/product');
const shoppingRouter = require('./routes/shopping');
const userLoggedMiddleware = require('./middlewares/userLogged');

app.use(express.static(publicPath));
app.use(methodOverride('_method')); // For PUT and DELETE methods
app.use(express.urlencoded({ extended: false })); //To be able to retrieve the forms data in the req element
app.use(cookieParser());
app.use(express.json()); //To be able to retrieve the forms data in the req element
app.use(userLoggedMiddleware);
/*app.use(session({ secret: "Nuestro mensaje secreto",
                  name: "logeo",
                  resave: false,
                  saveUninitialized: false }));*/
app.use('/', mainRouter);
app.use('/user', userRouter);
app.use('/search', searchRouter); //Consider changing into main router
app.use('/product', productRouter);
app.use('/cart', shoppingRouter);
app.set("view engine", "ejs");

app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));

app.use((req, res, next) => {
    res.status(404).render('not-found');
});