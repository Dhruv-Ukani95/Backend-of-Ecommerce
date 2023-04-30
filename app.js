// @ts-nocheck
 const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors) 

// @ts-ignore
const api = process.env.API_URL;

//Routes
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');



//middleware
app.use(bodyParser.json());
app.use(express.json()); 
app.use(morgan('tiny'));
app.use(authJwt());
app.use(errorHandler);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

//Database
// @ts-ignore
mongoose.connect(process.env.CONNECTION_STRING, {
 useNewUrlParser: true,
 useUnifiedTopology: true,
 dbName: 'eshop-database'
})

.then(() =>{
  console.log('Database connection is ready...')
})
.catch((err)=>{ 
  console.log(err);
})

app.listen(3000, ()=>{
    
    console.log('server is running http://localhost:3000');
})
