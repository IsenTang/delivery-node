const debug = require('debug')('mongoose');
const mongoose = require('mongoose');

/*
 * mongodb connection
 */
async function initConnection() {
   await mongoose.connect('mongodb://localhost/delivery', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   }, (error) => {
      if (error) {
         debug(error);
      }

      debug('mongodb connection success');
   });
}

module.exports = {
   initConnection,
};
