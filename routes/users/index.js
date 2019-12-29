const debug = require('debug')('users');
const { endpoint } = require('../common/handler');

module.exports = async (router) => {
  /**
   * 登录
   */


  /**
   * 注册
   */
  await endpoint(require('./register'), router);
};
