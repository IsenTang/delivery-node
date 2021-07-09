const { endpoint } = require('../common/handler');

module.exports = async (router) => {
   /*
     * admin 登录
    */
   await endpoint(require('./login'), router);
};
