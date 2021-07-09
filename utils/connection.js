const debug = require('debug')('mongoose');
const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);
/*
 * mongodb connection
 */
async function initConnection() {
   await mongoose.connect('mongodb://banyuan:banyuan123@49.235.98.65/delivery', {

      // await mongoose.connect('mongodb://localhost/delivery', {
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
