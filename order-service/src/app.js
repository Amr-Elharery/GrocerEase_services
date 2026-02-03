// Main application setup
const express = require('express');
const routes = require('./api/routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', routes);

// Health check (root endpoint)
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'GrocerEase Order Service',
    version: '1.0.0',
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Endpoint not found',
  });
});

// Global error handler
app.use(errorHandler);

module.exports = app;
