const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        message: "get is working"
    });
})

router.post('/', (req, res) => {
    res.status(201).json({
        message: "post is working"
    });
})

router.get('/:productId', (req, res) => {
    const id = req.params.productId;
    console.log(id);
    id === 'special' ? 
        res.status(200).json({
            message: "You discovered the special ID", 
            id: id
        }) : 
        res.status(200).json({ 
            message: "You passed an ID",
            id: id 
        });
})

router.delete('/:productId', (req, res) => {
    res.status(201).json({
        message: "You DELETE the product", 
        id: id
    }) 
})

router.patch('/:productId', (req, res) => {
    res.status(201).json({
        message: "You UPPDATE the product", 
        id: id
    }) 
})

module.exports = router;