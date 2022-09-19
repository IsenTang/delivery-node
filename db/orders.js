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

/**
 * 分页
 */
async function findByPage({ query, limit, skip }) {
   const result = await OrderModel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit)
      .exec();

   return result;
}

/**
 * count
 */
async function count({ query }) {
   const result = await OrderModel.find(query).countDocuments();

   return result;
}

module.exports = {
   create,
   find,
   findByPage,
   count,
};
