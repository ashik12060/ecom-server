const express = require('express');
const router = express.Router();

const { isAuthenticated } = require('../middleware/auth');
const { createOrder, getOrderById, getAllOrders } = require('../controllers/orderController');

// Order routes
router.post('/order/place', isAuthenticated, createOrder);
router.get('/order/:id', isAuthenticated, getOrderById);
router.get('/orders', isAuthenticated, getAllOrders);
// router.put('/order/update/:id', isAuthenticated, updateOrderStatus);

module.exports = router;
