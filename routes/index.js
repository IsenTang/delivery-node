const users = require('./users');
const restaurants = require('./restaurants');
const menus = require('./menus');
const order = require('./order');
const admin = require('./admin');

module.exports = async (router) => {
   await users(router);
   await restaurants(router);
   await menus(router);
   await order(router);
   await admin(router);
};
