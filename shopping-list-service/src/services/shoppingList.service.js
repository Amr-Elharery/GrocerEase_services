
const shoppingListRepository = require('../repositories/shoppingList.repository');

 class ShoppingListService {

async createList(userId, listName){
  if(!listName||listName.trim().length===0){
    throw new Error ('List name is required');
  }
  return await shoppingListRepository.createList(userId,listName);
}

async getUserLists(userId){
  return await shoppingListRepository.getUserLists(userId);
}

async getListWithItems(listId){
  const list = await shoppingListRepository.getListById(listId);
  if(!list){
    throw new Error("Shopping List not found");
  }
  const listItems= await shoppingListRepository.getListItems(listId);
  return {...list,listItems};
}

async updateList(listId,listName){
   if(!listName||listName.trim().length===0){
    throw new Error ('List name is required');
  }
  const updated= await shoppingListRepository.updateList(listId,listName);
  if(!updated){
    throw new Error('Shopping list not found');
  }
  return updated;
}

async deleteList(listId){
  const deleted= await shoppingListRepository.deleteList(listId);
  if(deleted.rowCount===0){
    throw new Error('Shopping list not found');
  }
}

async addItemToList(listId,productId,quantity){

  if(quantity<=0){
    throw new Error('Quantity cant be zero');
  }
  const list=shoppingListRepository.getListById(listId);
  if(!list){
    throw new Error('Shopping list not found');
  }
  
  return await shoppingListRepository.addItemToList(listId,productId,quantity);
}

async updateItemQuantity(itemId,quantity){
  if(quantity<=0){
    throw new Error('Quantity cant be zero');
  }
  const updated = await shoppingListRepository.updateItem(itemId,quantity);
  if(!updated){
    throw new Error('Item not found');
  }
  return updated;
}

async removeItemFromList(itemId){
  const deleted = await shoppingListRepository.removeItem(itemId);
  if(deleted.rowCount===0){
    throw new Error('Item not found')
  }
}

}

module.exports = new ShoppingListService();
