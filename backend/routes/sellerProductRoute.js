const express = require('express');
const router = express.Router();
const { createSellerProduct, getSellerProducts, getSellerProductById, deleteSellerProduct, updateSellerProduct } = require('../controllers/sellerProductController');
const { isAuthenticated } = require('../middleware/auth');

router.post('/sellerProduct/create', isAuthenticated, createSellerProduct);
router.get('/sellerProducts', getSellerProducts);
router.get('/sellerProduct/:id', getSellerProductById);
router.delete('/sellerProduct/:id', isAuthenticated, deleteSellerProduct);
router.put('/sellerProduct/:id', isAuthenticated, updateSellerProduct);

module.exports = router;
