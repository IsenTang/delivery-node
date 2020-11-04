const OrderModel = require('./models/order');

/* create */
async function create(data) {
   const order = new OrderModel(data);

   const result = await order.save();

   return result;
}

/**
 * find
 */
async function find({ query }) {
   const result = await OrderModel.find(query).lean().exec();

   return result;
}

module.exports = {
   create,
   find,
};
