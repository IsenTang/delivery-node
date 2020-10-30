const MenuModel = require('./models/menu');

/**
 * find
 */
async function find({ query }) {
   const result = await MenuModel.find(query).lean().exec();

   return result;
}

/**
 * find
 */
async function findByPage({ query, limit, skip }) {
   const result = await MenuModel.find(query).skip(skip).limit(limit).exec();

   return result;
}

/**
 * count
 */
async function count({ query }) {
   const result = await MenuModel.find(query).countDocuments();

   return result;
}

/**
 * update one
 */
async function updateOne({ query, updated }) {
   const { _id: id } = query;

   const result = await MenuModel.findByIdAndUpdate(
      id,
      { $set: { ...updated } },
      { upsert: true, new: true },
   );

   return result;
}

module.exports = {
   find,
   findByPage,
   count,
   updateOne,
};
