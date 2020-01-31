const { create, find } = require('../db/orders');
const Woops = require('../common/error');
const { canon } = require('../utils/utils');

/*
 * 下单
 */
async function placeOrder({ data }) {
   try {
      const result = await create(data);

      return result;
   } catch (error) {
      throw new Woops('Something wrong with place order.', 'Something wrong with place order.');
   }
}

/* 查找个人订单 */
async function getOrder({ userId }) {
   const query = {
      'user._id': canon(userId),
   };

   const result = await find({ query });

   return result;
}

module.exports = {
   placeOrder,
   getOrder,
};
