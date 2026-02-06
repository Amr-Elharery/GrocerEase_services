
const solver = require('javascript-lp-solver');

 class OptimizationService {


  async getCheapestStoreTrip(stores_in_user_zone, user_shopping_list) {
    try {
      if (!stores_in_user_zone || stores_in_user_zone.length === 0) {
        throw new Error('No stores available in your zone');
      }
      if (!user_shopping_list || user_shopping_list.length === 0) {
        throw new Error('Shopping list is empty');
      }

      const model = this.buildOptimizationModel(stores_in_user_zone, user_shopping_list);
      
      const solution = solver.Solve(model);
      
      return this.formatSolution(solution, stores_in_user_zone, user_shopping_list);
      
    } catch (error) {
      throw new Error(`Optimization failed: ${error.message}`);
    }
  }


  buildOptimizationModel(stores, shoppingList) {
    const model = {
      optimize: 'cost',
      opType: 'min',
      constraints: {},
      variables: {},
      ints: {} 
    };

    shoppingList.forEach(item => {
      model.constraints[`item_${item.product_id}`] = { min: item.quantity };
    });

    stores.forEach(store => {
      store.products.forEach(product => {
        const varName = `store_${store.shop_id}_product_${product.product_id}`;
        
        const listItem = shoppingList.find(
          item => item.product_id === product.product_id
        );
        
        if (listItem) {
          model.variables[varName] = {
            cost: product.price, 
            [`item_${product.product_id}`]: 1
          };
          
          if (product.stock > 0) {
            model.variables[varName].max = product.stock;
          }
          
          model.ints[varName] = 1;
        }
      });
    });

    return model;
  }


  formatSolution(solution, stores, shoppingList) {
    if (!solution.feasible) {
      const unavailableItems = this.findUnavailableItems(stores, shoppingList);
      throw new Error(
        `Cannot fulfill shopping list. Unavailable items: ${unavailableItems.join(', ')}`
      );
    }

    const storesPlan = {};
    let totalCost = 0;

    
    Object.keys(solution).forEach(key => {
      if (key.startsWith('store_') && solution[key] > 0) {
        const [, storeId, , productId] = key.split('_');
        const quantity = solution[key];
        
        if (!storesPlan[storeId]) {
          const store = stores.find(s => s.shop_id === parseInt(storeId));
          storesPlan[storeId] = {
            shop_id: parseInt(storeId),
            shop_name: store?.shop_name || `Store ${storeId}`,
            items: []
          };
        }
        
        const store = stores.find(s => s.shop_id === parseInt(storeId));
        const product = store?.products.find(
          p => p.product_id === parseInt(productId)
        );
        
        if (product) {
          const itemCost = product.price * quantity;
          totalCost += itemCost;
          
          storesPlan[storeId].items.push({
            product_id: parseInt(productId),
            product_name: product.product_name,
            quantity: quantity,
            unit_price: product.price,
            total_price: itemCost
          });
        }
      }
    });

    return {
      success: true,
      total_cost: parseFloat(totalCost.toFixed(2)),
      number_of_stores: Object.keys(storesPlan).length,
      stores: Object.values(storesPlan),
      summary: this.generateSummary(Object.values(storesPlan), totalCost)
    };
  }


  findUnavailableItems(stores, shoppingList) {
    const unavailable = [];
    
    shoppingList.forEach(item => {
      let totalAvailable = 0;
      
      stores.forEach(store => {
        const product = store.products.find(
          p => p.product_id === item.product_id && p.is_active && p.stock > 0
        );
        if (product) {
          totalAvailable += product.stock;
        }
      });
      
      if (totalAvailable < item.quantity) {
        unavailable.push({
          product_id: item.product_id,
          requested: item.quantity,
          available: totalAvailable
        });
      }
    });
    
    return unavailable;
  }


  generateSummary(stores, totalCost) {
    const itemCount = stores.reduce(
      (sum, store) => sum + store.items.reduce((s, item) => s + item.quantity, 0),
      0
    );
    
    return {
      total_items: itemCount,
      total_cost: parseFloat(totalCost.toFixed(2)),
      stores_to_visit: stores.length,
      recommendation: stores.length === 1 
        ? 'All items available at one store!' 
        : `Visit ${stores.length} stores for best prices`
    };
  }


  async getCheapestSingleStore(stores_in_user_zone, user_shopping_list) {
    let bestStore = null;
    let lowestCost = Infinity;

    stores_in_user_zone.forEach(store => {
      let storeCost = 0;
      let canFulfill = true;

      user_shopping_list.forEach(item => {
        const product = store.products.find(
          p => p.product_id === item.product_id && 
               p.is_active && 
               p.stock >= item.quantity
        );

        if (product) {
          storeCost += product.price * item.quantity;
        } else {
          canFulfill = false;
        }
      });

      if (canFulfill && storeCost < lowestCost) {
        lowestCost = storeCost;
        bestStore = {
          shop_id: store.shop_id,
          shop_name: store.shop_name,
          total_cost: storeCost
        };
      }
    });

    if (!bestStore) {
      throw new Error('No single store can fulfill entire shopping list');
    }

    return bestStore;
  }


  async getPriceComparison(stores_in_user_zone, product_id) {
    const comparison = [];

    stores_in_user_zone.forEach(store => {
      const product = store.products.find(
        p => p.product_id === product_id && p.is_active && p.stock > 0
      );

      if (product) {
        comparison.push({
          shop_id: store.shop_id,
          shop_name: store.shop_name,
          price: product.price,
          stock: product.stock,
          product_name: product.product_name
        });
      }
    });

    comparison.sort((a, b) => a.price - b.price);

    return {
      product_id,
      available_at: comparison.length,
      cheapest_price: comparison[0]?.price || null,
      most_expensive_price: comparison[comparison.length - 1]?.price || null,
      stores: comparison
    };
  }
}

 


module.exports = new OptimizationService();
