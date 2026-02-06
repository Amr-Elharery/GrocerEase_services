
const optimizationService = require('../services/optimization.service');

 class OptimizationController {


 
  async getCheapestStoreTrip(req, res) {
    try {
      const { stores, shoppingList } = req.body;

      if (!stores || !Array.isArray(stores) || stores.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Stores array is required and must not be empty'
        });
      }

      if (!shoppingList || !Array.isArray(shoppingList) || shoppingList.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Shopping list is required and must not be empty'
        });
      }

      const result = await optimizationService.getCheapestStoreTrip(stores, shoppingList);

      return res.status(200).json({success:true,data:result});

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }


  async getCheapestSingleStore(req, res) {
    try {
      const { stores, shoppingList } = req.body;

      if (!stores || !Array.isArray(stores)) {
        return res.status(400).json({
          success: false,
          message: 'Stores array is required'
        });
      }

      if (!shoppingList || !Array.isArray(shoppingList)) {
        return res.status(400).json({
          success: false,
          message: 'Shopping list is required'
        });
      }

      const result = await optimizationService.getCheapestSingleStore(stores, shoppingList);

      return res.status(200).json({
        success: true,
        data: result
      });

    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }


 

  
}

module.exports = new OptimizationController();
