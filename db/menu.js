const MenuModel = require('./models/menu');

/**
 * find
 */
async function find({ query }) {
   const result = await MenuModel.find(query).lean().exec();

   return result;
}

module.exports = {
   find,
};
