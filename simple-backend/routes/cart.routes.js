const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart.controller');

router.post('/add', cartController.addToCart);
router.get('/show', cartController.showCart);
router.post('/remove', cartController.removeCartItem);

module.exports = router;
