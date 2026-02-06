const shopController =require('../controllers/shop.controllers')


const express = require('express')
const app = express()
const PORT = process.env.PORT||3003;


app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Shop Service is working' });
});


app.post('/api/shops',(req,res)=>shopController.createShop(req,res));
app.get('/api/users/:userId/shops',(req,res)=>shopController.getUserShops(req,res));
app.get('/api/shops/:shopId',(req,res)=>shopController.getShopById(req,res));
app.patch('/api/shops/:shopId',(req,res)=>shopController.updateShop(req,res));
app.delete('/api/shops/:shopId',(req,res)=>shopController.deleteShop(req,res));



app.get('/api/shops/:shopId/location',(req,res)=>shopController.getShopLocation(req,res));
app.post('/api/shops/:shopId/location',(req,res)=>shopController.addShopLocation(req,res));
app.patch('/api/shops/:shopId/location',(req,res)=>shopController.updateShopLocation(req,res));
app.delete('/api/shops/location/:locationId',(req,res)=>shopController.deleteShopLocation(req,res));

app.get('/api/shops/:shopId/products',(req,res)=>shopController.getShopProducts(req,res));
app.post('/api/shops/:shopId/products',(req,res)=>shopController.addProductToShop(req,res));
app.patch('/api/shops/products/:shopProductId',(req,res)=>shopController.updateShopProduct(req,res));
app.delete('/api/shops/products/:shopProductId',(req,res)=>shopController.removeShopProduct(req,res));

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  Shop Service (Prototype)    ║
║  Port: ${PORT}                            ║
║  Status: Running ✅                     ║
╚════════════════════════════════════════╝
  `);
  console.log(`🚀 http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
});

module.exports = app;