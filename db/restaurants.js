const RestaurantModel = require('./models/restaurant');

/**
 * find
 */
async function find({ query }) {
   const result = await RestaurantModel.find(query).exec();

   return result;
}

/**
 * findOne
 */
async function findOne(query) {
   const result = await RestaurantModel.findOne(query).exec();

   return result;
}

/*  */
async function findByPage({ query, limit, skip }) {
   const result = await RestaurantModel.find(query).skip(skip).limit(limit).exec();

   return result;
}

module.exports = {
   find,
   findOne,
   findByPage,
};
