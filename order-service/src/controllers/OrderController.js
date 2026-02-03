// Order controller - Request/Response handling
const OrderService = require('../services/OrderService');

class OrderController {
  async getOrders(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const result = await OrderService.getOrders(page, limit);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getOrderById(req, res, next) {
    try {
      const { id } = req.params;

      const result = await OrderService.getOrderById(id);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new OrderController();
