//products.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product')

router.get('/', (req, res) => {
    Product.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({
                message: err.message
            })
        });
})

router.post('/', (req, res) => {
    const product = new Product({
        _id:new mongoose.Types.ObjectId(),
        name: req.body.name,
        title: req.body.title,
        price: req.body.price
    });

    console.log(product);

    product.save()
        .then(savedProduct => {
            res.status(201).json({
                message: "post is working",
                createdProduct: savedProduct
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

    
})

router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    Product.findById(id).exec().then(doc => {
        console.log("from database", doc);
        if (doc) {
            res.status(200).json(doc)
        } else {
            res.status(404).json({message: "Product not found"});
        }
    })
})

router.delete('/:productId', (req, res) => {
    const id = req.params.productId
    Product.deleteOne({_id: id})
        .then(result => res.status(200).json(result))
        .catch(err =>{
            console.log(err);
            res.status(500).json({
                err: err.message
            })
        })
})

router.patch('/:productId', (req, res) => {
    const id = req.params.productId
    const updateOps = {}
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value
    } 
    Product.updateOne({_id: id}, { $set: updateOps })
    .exec()
    .then(result => res.status(200).json(result))
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            err: err.message
        })
    })
    
})

/* update req
[
    {   
        "propName": "name",
        "value": "Bulignichek"
    },
    {   
        "propName": "title",
        "value": "New Title"
    },
    {   
        "propName": "price",
        "value": 20.99
    }
]
*/

module.exports = router;