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
};
