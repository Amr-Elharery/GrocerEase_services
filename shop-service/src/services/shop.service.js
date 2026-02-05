
const shopRepository = require('../repositories/shop.repository');

 class ShopService {

  //Shop
  async createShop(userId, shopName) {
    if (!shopName || shopName.trim().length === 0) {
      throw new Error('Shop name is required');
    }
    const result = await shopRepository.createShop(userId, shopName);
    return result.rows[0];
  }

  async getUserShops(userId) {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const result = await shopRepository.getUserShops(userId);
    return result.rows;
  }

  async getShopById(shopId) {
    if (!shopId) {
      throw new Error('Shop ID is required');
    }
    const result = await shopRepository.getShopById(shopId);
    if (result.rows.length === 0) {
      throw new Error('Shop not found');
    }
    return result.rows[0];
  }

  async updateShop(shopId, shopName) {
    if (!shopId) {
      throw new Error('Shop ID is required');
    }
    if (!shopName || shopName.trim().length === 0) {
      throw new Error('Shop name is required');
    }
    const result = await shopRepository.updateShop(shopId, shopName);
    if (result.rows.length === 0) {
      throw new Error('Shop not found');
    }
    return result.rows[0];
  }

  async deleteShop(shopId) {
    if (!shopId) {
      throw new Error('Shop ID is required');
    }
    const result = await shopRepository.deleteShop(shopId);
    if (result.rowCount === 0) {
      throw new Error('Shop not found');
    }
    return { message: 'Shop deleted successfully' };
  }

  //Shop Location
  async getShopLocation(shopId) {
    if (!shopId) {
      throw new Error('Shop ID is required');
    }
    const result = await shopRepository.getShopLocation(shopId);
    return result.rows[0] || null;
  }

  async addShopLocation(shopId, locationData) {
    if (!shopId) {
      throw new Error('Shop ID is required');
    }
    
    const { areaId, city, buildingName, streetName, streetNumber, longitude, latitude } = locationData;
    
    if (!areaId || !city) {
      throw new Error('Area ID and city are required');
    }

    if (longitude !== undefined && (longitude < -180 || longitude > 180)) {
      throw new Error('Invalid longitude value');
    }
    if (latitude !== undefined && (latitude < -90 || latitude > 90)) {
      throw new Error('Invalid latitude value');
    }

    const result = await shopRepository.addShopLocation(
      shopId, areaId, city, buildingName, streetName, streetNumber, longitude, latitude
    );
    return result.rows[0];
  }

  async updateShopLocation(shopId, locationData) {
    if (!shopId) {
      throw new Error('Shop ID is required');
    }

    const { areaId, city, buildingName, streetName, streetNumber, longitude, latitude } = locationData;

    if (!areaId || !city) {
      throw new Error('Area ID and city are required');
    }

    if (longitude !== undefined && (longitude < -180 || longitude > 180)) {
      throw new Error('Invalid longitude value');
    }
    if (latitude !== undefined && (latitude < -90 || latitude > 90)) {
      throw new Error('Invalid latitude value');
    }

    const result = await shopRepository.updateShopLocation(
      shopId, areaId, city, buildingName, streetName, streetNumber, longitude, latitude
    );
    if (result.rows.length === 0) {
      throw new Error('Shop location not found');
    }
    return result.rows[0];
  }

  async deleteShopLocation(locationId) {
    if (!locationId) {
      throw new Error('Location ID is required');
    }
    const result = await shopRepository.deleteShopLocation(locationId);
    if (result.rowCount === 0) {
      throw new Error('Shop location not found');
    }
    return { message: 'Shop location deleted successfully' };
  }

    //Shop Products  
  async addProductToShop(shopId, productData) {
    if (!shopId) {
      throw new Error('Shop ID is required');
    }

    const { productId, stock, price, isActive } = productData;

    if (!productId) {
      throw new Error('Product ID is required');
    }
    if (stock === undefined || stock < 0) {
      throw new Error('Valid stock quantity is required');
    }
    if (price === undefined || price < 0) {
      throw new Error('Valid price is required');
    }

    const result = await shopRepository.addProductToShop(
      shopId, productId, stock, price, isActive !== undefined ? isActive : true
    );
    return result.rows[0];
  }

  async getShopProducts(shopId) {
    if (!shopId) {
      throw new Error('Shop ID is required');
    }
    const result = await shopRepository.getShopProducts(shopId);
    return result.rows;
  }

  async updateShopProduct(shopProductId, productData) {
    if (!shopProductId) {
      throw new Error('Shop product ID is required');
    }

    const { stock, price, isActive } = productData;

    if (stock !== undefined && stock < 0) {
      throw new Error('Valid stock quantity is required');
    }
    if (price !== undefined && price < 0) {
      throw new Error('Valid price is required');
    }

    const result = await shopRepository.updateShopProduct(
      shopProductId, stock, price, isActive
    );
    if (result.rows.length === 0) {
      throw new Error('Shop product not found');
    }
    return result.rows[0];
  }

  async removeShopProduct(shopProductId) {
    if (!shopProductId) {
      throw new Error('Shop product ID is required');
    }
    const result = await shopRepository.removeShopProduct(shopProductId);
    if (result.rowCount === 0) {
      throw new Error('Shop product not found');
    }
    return { message: 'Product removed from shop successfully' };
  }
}


module.exports = new ShopService();
