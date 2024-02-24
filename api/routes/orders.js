const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: "all orders were feacthed"
    });
})

router.post('/', (req, res) => {
    res.status(201).json({
        message: "order was created"
    });
})

router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    res.status(200).json({
        message: "You discovered the order", 
        id: id
    }) 
})

router.delete('/:productId', (req, res) => {
    const id = req.params.productId;
    res.status(201).json({
        message: "You delete the order", 
        id: id
    }) 
})

router.patch('/:productId', (req, res) => {
    const id = req.params.productId;
    res.status(201).json({
        message: "You uppdate the order", 
        id: id
    }) 
})

module.exports = router;
