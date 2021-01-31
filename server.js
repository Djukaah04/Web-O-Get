const express = require('express');
const cors = require('cors');
const path = require('path');
const cassandra = require('cassandra-driver')

const app = express();
app.use(cors())

//  Getting our routes
const users = require('./server/routes/users')
const add_user = require('./server/routes/add_user')
const products_by_id = require('./server/routes/products_by_id')
const products_by_type = require('./server/routes/products_by_type')
const products_by_price = require('./server/routes/products_by_price')
const purchase = require('./server/routes/purchase')
const update = require('./server/routes/update')

//  Using middeware
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/users', users);
app.use('/add_user', add_user);
app.use('/products_by_id', products_by_id);
app.use('/products_by_type', products_by_type);
app.use('/products_by_price', products_by_price);
app.use('/purchase', purchase);
app.use('/update', update);

//  Catch all routes requests and return it to the index.html
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, 'dist/web-o-get/index.html'))
});

const port = process.env.PORT || 4600;

app.listen(port, (req, res) =>{ 
    console.log(`Running on port ${port}`); 
});
