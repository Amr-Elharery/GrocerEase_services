// Order service - Business logic layer
const OrderRepository = require('../repositories/OrderRepository');

class OrderService {
  async getOrders(page = 1, limit = 10) {
    try {
      // Validate pagination parameters
      const pageNum = Math.max(1, parseInt(page, 10) || 1);
      const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));
      const offset = (pageNum - 1) * limitNum;

      // Fetch orders and total count in parallel
      const [orders, total] = await Promise.all([
        OrderRepository.getAll(limitNum, offset),
        OrderRepository.getCount(),
      ]);

      return {
        success: true,
        data: orders,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      };
    } catch (error) {
      throw {
        statusCode: 500,
        message: error.message,
      };
    }
  }

  async getOrderById(id) {
    try {
      if (!id) {
        throw {
          statusCode: 400,
          message: 'Order ID is required',
        };
      }

      const order = await OrderRepository.getById(id);

      if (!order) {
        throw {
          statusCode: 404,
          message: 'Order not found',
        };
      }

      return {
        success: true,
        data: order,
      };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new OrderService();
