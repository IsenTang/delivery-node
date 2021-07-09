const { endpoint } = require('../common/handler');

module.exports = async (router) => {
   /**
   * 下单
   */
   await endpoint(require('./placeOrder'), router);

   /*
    * 获取用户订单信息
    */
   await endpoint(require('./getOrder'), router);

   /*
    * 获取所有订单信息
    */
   await endpoint(require('./getOrderByTime'), router);
};
