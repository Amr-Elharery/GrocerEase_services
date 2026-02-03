// Order repository - Database access layer
const pool = require('../config/database');

class OrderRepository {
  async getAll(limit = 10, offset = 0) {
    try {
      const query = `
        SELECT * FROM orders 
        ORDER BY created_at DESC 
        LIMIT $1 OFFSET $2
      `;
      const result = await pool.query(query, [limit, offset]);
      return result.rows;
    } catch (error) {
      throw new Error(`Failed to fetch orders: ${error.message}`);
    }
  }

  async getById(id) {
    try {
      const query = 'SELECT * FROM orders WHERE id = $1';
      const result = await pool.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to fetch order: ${error.message}`);
    }
  }

  async getCount() {
    try {
      const query = 'SELECT COUNT(*) FROM orders';
      const result = await pool.query(query);
      return parseInt(result.rows[0].count, 10);
    } catch (error) {
      throw new Error(`Failed to count orders: ${error.message}`);
    }
  }
}

module.exports = new OrderRepository();
