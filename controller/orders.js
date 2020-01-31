const { create } = require('../db/orders');
const Woops = require('../common/error');

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

module.exports = {
   placeOrder,
};
