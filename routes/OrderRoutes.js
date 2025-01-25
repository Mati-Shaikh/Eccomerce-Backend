const express = require('express');
const router = express.Router();
const { addOrder, getAllOrders, getOrderById } = require('../Controllers/OrderController');

// Route to create a new order
router.post('/orders', addOrder);

// Route to get all orders
router.get('/orders', getAllOrders);

// Route to get a single order by ID
router.get('/orders/:id', getOrderById);

module.exports = router;
