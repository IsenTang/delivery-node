const joi = require('@hapi/joi');
const controller = require('../../controller/orders');

/* schema */
const schema = joi.object().keys();

/* handler */
async function handler(ctx) {
   const result = await controller.getOrderByPage(ctx.params);

   ctx.response.body = result;
}

module.exports = {
   method: 'get',
   url: '/order/:userId/page/:page/limit/:limit',
   schema,
   handler,
};
