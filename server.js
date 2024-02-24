//server.js
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const userRoutes = require('./api/routes/users.js');
const productRoutes = require('./api/routes/products.js');
const orderRoutes = require('./api/routes/orders.js');

const app = express();

app.get('/', (req, res) => {
    res.status(200).json({ "users":["userOne", "userTwo", "userThree"] });
});

app.use(bodyParser.json());
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.listen(5000, () => { console.log("Server started on 5000 port"); });
