const { endpoint } = require('../common/handler');

module.exports = async (router) => {
   /**
   * 获取菜单信息
   */
   await endpoint(require('./getMenu'), router);

   /*
    * 分页获取餐馆食物
   */
   await endpoint(require('./getFoodsByPage'), router);

   /*
    * 更新食物
   */
   await endpoint(require('./updateFood'), router);
};
