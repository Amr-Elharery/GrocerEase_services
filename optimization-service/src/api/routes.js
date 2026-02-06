const express = require('express')

const optimizationController = require('../controllers/optimization.controllers');

const app = express()
const PORT = process.env.PORT||3004;


app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Optimization Service is working' });
});



app.post('/api/optimization/cheapest-trip', (req, res) => 
  optimizationController.getCheapestStoreTrip(req, res)
);

app.post('/api/optimization/cheapest-single-store', (req, res) => 
  optimizationController.getCheapestSingleStore(req, res)
);

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  Optimization Service (Prototype)    ║
║  Port: ${PORT}                            ║
║  Status: Running ✅                     ║
╚════════════════════════════════════════╝
  `);
  console.log(`🚀 http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
});

module.exports = app;