
const shopService = require('../services/shop.service');

class ShopController {
  
  async createShop(req, res) {
    try {
      const { userId,shopName } = req.body;
      
      const shop = await shopService.createShop(userId, shopName);
      
      return res.status(201).json({
        success: true,
        data: shop,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getUserShops(req, res) {
    try {
      const userId = req.params.userId;
      
      const shops = await shopService.getUserShops(userId);
      
      return res.status(200).json({
        success: true,
        data: shops
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getShopById(req, res) {
    try {
      const  shopId  = req.params.shopId;
      
      const shop = await shopService.getShopById(shopId);
      
      return res.status(200).json({
        success: true,
        data: shop
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateShop(req, res) {
    try {

      const shopId=req.params.shopId;
      const  {shopName}  = req.body;
      
      const shop = await shopService.updateShop(shopId, shopName);
      
      return res.status(200).json({
        success: true,
        data: shop
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteShop(req, res) {
    try {
      const  shopId = req.params.shopId;
      
      const result = await shopService.deleteShop(shopId);
      
      return res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // Shop Location 
  async getShopLocation(req, res) {
    try {
      const  shopId  = req.params.shopId;
      
      const location = await shopService.getShopLocation(shopId);
      
      return res.status(200).json({
        success: true,
        data: location
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async addShopLocation(req, res) {
    try {
      const shopId= req.params.shopId
      const locationData  = req.body;
      
      const location = await shopService.addShopLocation(shopId, locationData);
      
      return res.status(201).json({
        success: true,
        data: location
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateShopLocation(req, res) {
    try {
       const shopId= req.params.shopId
      const locationData  = req.body;
      
      
      
      const location = await shopService.updateShopLocation(shopId, locationData);
      
      return res.status(200).json({
        success: true,
        data: location
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async deleteShopLocation(req, res) {
    try {
      const  locationId  = req.params.locationId;
      
      const result = await shopService.deleteShopLocation(locationId);
      
      return res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  // Shop Product 
  async addProductToShop(req, res) {
    try {
       const shopId= req.params.shopId
      const productData  = req.body;
      
      
      const shopProduct = await shopService.addProductToShop(shopId, productData);
      
      return res.status(201).json({
        success: true,
        data: shopProduct
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async getShopProducts(req, res) {
    try {
      const  shopId  = req.params.shopId;
      
      const products = await shopService.getShopProducts(shopId);
      
      return res.status(200).json({
        success: true,
        data: products
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }

  async updateShopProduct(req, res) {
    try {
      const shopProductId= req.params.shopProductId
      const productData  = req.body;
      
      const shopProduct = await shopService.updateShopProduct(shopProductId, productData);
      
      return res.status(200).json({
        success: true,
        data: shopProduct
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }

  async removeShopProduct(req, res) {
    try {
      const  shopProductId  = req.params.shopProductId;
      
      const result = await shopService.removeShopProduct(shopProductId);
      
      return res.status(200).json({
        success: true,
        message: result.message
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message
      });
    }
  }
}

module.exports = new ShopController();
