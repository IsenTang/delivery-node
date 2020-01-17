const users = require('./users/index');

module.exports = async (router) => {
   await users(router);
};
