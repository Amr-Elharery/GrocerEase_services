// Order service API routes
const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Order Service is running',
    timestamp: new Date().toISOString(),
  });
});

// Order endpoints
router.get('/orders', (req, res, next) =>
  OrderController.getOrders(req, res, next),
);
router.get('/orders/:id', (req, res, next) =>
  OrderController.getOrderById(req, res, next),
);

// TODO: Add more endpoints
// router.post('/orders', createOrder);
// router.put('/orders/:id', updateOrder);
// router.delete('/orders/:id', deleteOrder);

module.exports = router;
