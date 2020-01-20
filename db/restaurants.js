const RestaurantModel = require('./models/restaurant');

/**
 * find
 */
async function find({ query }) {
   const result = await RestaurantModel.find(query).exec();

   return result;
}

module.exports = {
   find,
};
