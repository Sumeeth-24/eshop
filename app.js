const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

require('dotenv/config');

app.use(cors());
app.options('*', cors());


//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandler);

const api = process.env.API_URL;

// Routes
const categoriesRouter = require('./routers/categories');
const productsRouter = require('./routers/products');
const usersRouter = require('./routers/users');
const ordersRouter = require('./routers/orders');


// Routers
app.use(`${api}/categories`, categoriesRouter)
app.use(`${api}/products`, productsRouter)
app.use(`${api}/users`, usersRouter)
app.use(`${api}/orders`, ordersRouter)



mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database',
    family: 4
})
.then(()=> {
    console.log('Database Connection is ready...');
})
.catch((err) => {
    console.log(err);
})


// DEVELOPMENT
app.listen(3000, () => {
    console.log('server is running on http://localhost:3000');
})

// PRODUCTION
// var server = app.listen(process.env.PORT || 3000, function (){
//     var port = server.address().port;
//     console.log("Express is working on port " + port)
// })