const users = require('./users/index');
const restaurants = require('./restaurants/index');

module.exports = async (router) => {
   await users(router);
   await restaurants(router);
};
