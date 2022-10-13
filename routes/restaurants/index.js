const { endpoint } = require('../common/handler');

module.exports = async (router) => {
   /**
   * 获取餐馆信息
   */
   await endpoint(require('./getRestaurant'), router);

   /*
    * 更新餐馆
    */
   await endpoint(require('./updateRestaurant'), router);

   /*
    * 获取tags
    */
   await endpoint(require('./getTags'), router);

   /*
    * 分页获取餐馆
    */
   await endpoint(require('./getRestaurantByPage'), router);

   /*
    * 获取单个餐馆信息
    */
   await endpoint(require('./getRestaurantInfo'), router);
};
