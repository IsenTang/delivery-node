const users = require('./users');
const restaurants = require('./restaurants');
const menus = require('./menus');
const order = require('./order');

module.exports = async (router) => {
   await users(router);
   await restaurants(router);
   await menus(router);
   await order(router);
};
