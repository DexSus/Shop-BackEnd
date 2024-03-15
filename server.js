//server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users.js');
const productRoutes = require('./api/routes/products.js');
const orderRoutes = require('./api/routes/orders.js');
// mongodb+srv://' + process.env.MONGO_ATLAS_LG + ':' + process.env.MONGO_ATLAS_PW  + '@node-rest-shop.codu4rt.mongodb.net/space-shop?retryWrites=true&w=majority

mongoose.connect('mongodb+srv://' + process.env.MONGO_ATLAS_LG + ':' + process.env.MONGO_ATLAS_PW  + '@node-rest-shop.codu4rt.mongodb.net/space-shop?retryWrites=true&w=majority')
.then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Acept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE');
        return res.status(200).json({})
    }
    next();
});

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
