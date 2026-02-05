
const pool = require('../config/database');
 class ShoppingListRepository{

  async createList (userId,listName){
    return await pool.query('INSERT INTO shopping_list (user_id,list_name) VALUES ($1, $2) RETURNING *',[userId,listName]);
  }

  async getUserLists(userId){
    return await pool.query('SELECT * FROM shopping_list WHERE user_id=$1 ORDER BY created_at DESC',[userId])
  }

  async getListById(listId){
    return await pool.query('SELECT * FROM shopping_list WHERE id=$1',[listId]);
  }


  async updateList(listId,listName){
    return await pool.query('UPDATE shopping_list SET list_name=$1 WHERE id=$2',[listName,listId]);
  }


  async deleteList(listId){
      return await pool.query('DELETE FROM shopping_list WHERE id = $1',[listId]);
  }

  async addItemToList(list_id,product_id,quantity){
    return await pool.query("INSERT INTO list_item (shoppinglist_id,product_id,quantity) VALUES($1,$2,$3) RETURNING *",[list_id,product_id,quantity]);
  }

  async getListItems(listId){
    return await pool.query('SELECT li.*,p.product_name,p.price,p.description FROM list_item li join product p on li.product_id =p.id WHERE li.shoppinglist_id = $1',[listId]);
  }

  async updateItem(itemId,quantity){
    return await pool.query('UPDATE list_item SET quantity=$1 WHERE id=$2 RETURNING *',[quantity,itemId]);
  }

  async removeItem(itemId){
    return await pool.query('DELETE from list_item WHERE id = $1',[itemId]);
  }
}

module.exports = new ShoppingListRepository();