const express = require('express')

const shoppingListController = require('./controllers/shoppinglist.controllers');

const app = express()
const PORT = process.env.PORT||3002;


app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Shopping List Service is working' });
});


app.post('/api/shopping-lists',(req,res)=>shoppingListController.createList(req,res));
app.get('/api/users/:userId/shopping-lists',(req,res)=>shoppingListController.getUserLists(req,res));
app.get('/api/shopping-lists/:listId',(req,res)=>shoppingListController.getListWithItems(req,res));
app.patch('/api/shopping-lists/:listId',(req,res)=>shoppingListController.updateList(req,res));
app.delete('/api/shopping-lists/:listId',(req,res)=>shoppingListController.deleteList(req,res));
app.post('/api/shopping-lists/',(req,res)=>shoppingListController.createList(req,res));


app.post('/api/shopping-lists/:listId/items',(req,res)=>shoppingListController.addItem(req,res));
app.patch('/api/items/:itemId',(req,res)=>shoppingListController.updateItem(req,res));
app.delete('/api/items/:itemId',(req,res)=>shoppingListController.removeItem(req,res));

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  Shopping List Service (Prototype)    ║
║  Port: ${PORT}                            ║
║  Status: Running ✅                     ║
╚════════════════════════════════════════╝
  `);
  console.log(`🚀 http://localhost:${PORT}`);
  console.log(`🏥 Health: http://localhost:${PORT}/health`);
});

module.exports = app;