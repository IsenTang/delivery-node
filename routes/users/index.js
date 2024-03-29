// const debug = require('debug')('users');
const { endpoint } = require('../common/handler');

module.exports = async (router) => {
   /**
   * 登录
   */
   await endpoint(require('./login'), router);

   /**
   * 注册
   */
   await endpoint(require('./register'), router);

   /**
   * 微信登陆
   */
   await endpoint(require('./wxLogin'), router);
};
