//server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const userRoutes = require('./api/routes/users.js');
const productRoutes = require('./api/routes/products.js');
const orderRoutes = require('./api/routes/orders.js');

const app = express();

app.use(bodyParser.json());

app.use(morgan('dev'))

// Routes which should handle the request
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({ 
        error: {
            message: error.message
        }
    })
})

app.listen(5000, () => { console.log("Server started on 5000 port"); });
