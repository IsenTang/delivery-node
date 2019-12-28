const debug = require('debug')('users');
const controller = require('../controller/users');

module.exports = (router) => {
  /**
   * 登录
   */
  router.post('/login', async (ctx, next) => {
    const { password, username } = ctx.request.body;
  });
};
