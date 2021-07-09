const _ = require('lodash');
const Woops = require('../common/error');

async function login({ username }) {
   const array = [ 'admin', 'employee', 'visitor' ];

   const data = {};
   if (_.includes(array, username)) {
      data.role = username;
   } else {
      throw new Woops('Username-Error', 'Please type in correct username.');
   }

   return data;
}

module.exports = {
   login,
};
