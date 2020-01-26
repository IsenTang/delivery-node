const CategoryModel = require('./models/category');

/**
 * find
 */
async function find({ query }) {
   const result = await CategoryModel.find(query).exec();

   return result;
}

module.exports = {
   find,
};
