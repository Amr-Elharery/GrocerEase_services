
const shoppingListService = require('../services/shoppingList.service');

 class ShoppingListController {

  async createList(req, res) {
    try {
      const { user_id, list_name } = req.body;
      const result = await shoppingListService.createList(user_id, list_name);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async getUserLists(req, res) {
    try {
      const userId = parseInt(req.params.userId );
      const result = await shoppingListService.getUserLists(userId);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getListWithItems(req,res){
    try{
      const listId=parseInt(req.params.listId);
      const result= await shoppingListService.getListWithItems(listId);
      res.json({success:true,data:result});
    }
    catch(error){
      res.status(404).json({success:false,message:error.message});
    }
  }

   async updateList(req , res) {
    try {
      const listId = parseInt(req.params.listId );
      const { list_name } = req.body;
      const result = await shoppingListService.updateList(listId, list_name);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async deleteList(req, res) {
    try {
      const listId = parseInt(req.params.listId );
      await shoppingListService.deleteList(listId);
      res.json({ success: true, message: 'Shopping list deleted' });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  async addItem(req , res) {
    try {
      const listId = parseInt(req.params.listId );
      const { product_id, quantity } = req.body;
      const result = await shoppingListService.addItemToList(listId, product_id, quantity);
      res.status(201).json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async updateItem(req , res) {
    try {
      const itemId = parseInt(req.params.itemId );
      const { quantity } = req.body;
      const result = await shoppingListService.updateItemQuantity(itemId, quantity);
      res.json({ success: true, data: result });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  async removeItem(req , res) {
    try {
      const itemId = parseInt(req.params.itemId );
      await shoppingListService.removeItemFromList(itemId);
      res.json({ success: true, message: 'Item removed from list' });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  }

  
}

module.exports = new ShoppingListController();
