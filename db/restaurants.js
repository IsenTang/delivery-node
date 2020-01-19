const RestaurantModel = require('./models/restaurant');

/**
 * find
 */
async function findNearBy(data) {
   const query = RestaurantModel.find();

   const result = await query.where('location').nearSphere(data).limit(30).exec();

   return result;
}

module.exports = {
   findNearBy,
};
