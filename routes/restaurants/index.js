const { endpoint } = require('../common/handler');

module.exports = async (router) => {
   /**
   * 获取餐馆信息
   */
   await endpoint(require('./getRestaurant'), router);
};
