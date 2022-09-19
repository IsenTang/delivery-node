const RestaurantModel = require('./models/restaurant');

/**
 * find
 */
async function find({ query }) {
   const result = await RestaurantModel.find(query).lean();

   return result;
}

/**
 * findOne
 */
async function findOne({ query }) {
   const result = await RestaurantModel.findOne(query).exec();

   return result;
}

/* 分页 */
async function findByPage({ query, limit, skip }) {
   const result = await RestaurantModel.find(query).skip(skip).limit(limit).exec();

   return result;
}

/**
 * update
 */
async function update({ query, updated }) {
   const result = await RestaurantModel.updateOne(query, updated, { upsert: true });

   return result;
}

/**
 * count
 */
async function count({ query }) {
   const result = await RestaurantModel.find(query).countDocuments();

   return result;
}

module.exports = {
   find,
   findOne,
   findByPage,
   update,
   count,
};
