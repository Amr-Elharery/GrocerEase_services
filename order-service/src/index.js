// Server entry point
const app = require('./app');
const { PORT, NODE_ENV } = require('./config/env');

const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║     GrocerEase Order Service           ║
╠════════════════════════════════════════╣
║  Server Running                     ║
║  Port: ${PORT}                         ║
║  Environment: ${NODE_ENV.padEnd(25)} ║
║  Started: ${new Date().toLocaleString().padEnd(20)} ║
╚════════════════════════════════════════╝
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  server.close(() => {
    console.log('HTTP server closed');
    process.exit(0);
  });
});
