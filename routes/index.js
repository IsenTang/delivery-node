const users = require('./users/index');
const restaurants = require('./restaurants/index');
const menus = require('./menus/index');

module.exports = async (router) => {
   await users(router);
   await restaurants(router);
   await menus(router);
};
