
const pool = require('../config/database');


 class ShopRepository{


  //Shop
  async createShop (userId,shopName){
    return await pool.query('INSERT INTO shop (user_id,shop_name) VALUES ($1, $2) RETURNING *',[userId,shopName]);
  }

  async getUserShops(userId){
    return await pool.query('SELECT * FROM shop WHERE user_id=$1 ORDER BY created_at DESC',[userId])
  }

  async getShopById(shopId){
    return await pool.query('SELECT * FROM shop WHERE id=$1',[shopId]);
  }

  async updateShop(shopId,shopName){
    return await pool.query('UPDATE shop SET shop_name=$1 WHERE id=$2 RETURNING *',[shopName,shopId]);
  }

  async deleteShop(shopId){
      return await pool.query('DELETE FROM shop WHERE id = $1',[shopId]);
  }

  //Shop Location
  async getShopLocation(shopId){
    return await pool.query('SELECT sl.area_id,a.area_name,sl.city,sl.building_name,sl.street_name,sl.street_number,sl.longitude,sl.latitude From shop_location sl join area a on sl.area_id=a.id WHERE shop_id=$1',[shopId]);
  }

  async addShopLocation(shopId,areaId,city,buildingName,streetName,streetNumber,longitude,latitude){

    return await pool.query('INSERT INTO shop_location (shop_id,area_id,city,building_name,street_name,street_number,longitude,latitude) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',[shopId,areaId,city,buildingName,streetName,streetNumber,longitude,latitude]);
  }

  async updateShopLocation(shopId,areaId,city,buildingName,streetName,streetNumber,longitude,latitude){
    return await pool.query('UPDATE shop_location SET area_id=$1,city=$2,building_name=$3,street_name=$4,street_number=$5,longitude=$6,latitude=$7 WHERE shop_id=$8 RETURNING *',[areaId,city,buildingName,streetName,streetNumber,longitude,latitude,shopId]);
  }

  async deleteShopLocation(locationId){
    return await pool.query('DELETE FROM shop_location WHERE id = $1',[locationId]);
  }

  //Shop Products
  async addProductToShop(shopId,productId,stock,price,isActive){
    return await pool.query("INSERT INTO shop_product (shop_id,product_id,stock,price,is_active) VALUES($1,$2,$3,$4,$5) RETURNING *",[shopId,productId,stock,price,isActive]);
  }

  async getShopProducts(shopId){
    return await pool.query('SELECT sp.*,p.product_name,p.description FROM shop_product sp join product p on sp.product_id=p.id WHERE sp.shop_id=$1',[shopId]);
  }

  async updateShopProduct(shopProductId,stock,price,isActive){
    return await pool.query('UPDATE shop_product SET stock=$1, price=$2, is_active=$3 WHERE id=$4 RETURNING *',[stock,price,isActive,shopProductId]);
  }

  async removeShopProduct(shopProductId){
    return await pool.query('DELETE from shop_product WHERE id = $1',[shopProductId]);
  }
}

module.exports = new ShopRepository();