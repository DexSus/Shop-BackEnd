//users.js

const express = require('express');
const router = express.Router();

const users = [
    {
        name: "John",
        lastName: "Doe",
        age: 25
    },
    {
        name: "Joan",
        lastName: "Doe",
        age: 24
    }
]

router.get('/', (req, res) => {
    res.json({"success": true})
});

router.post('/', (req, res) => {
    
});

module.exports = router;
