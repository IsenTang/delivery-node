const joi = require('@hapi/joi');
const controller = require('../../controller/orders');

/* schema */
const schema = joi.object().keys();

/* handler */
async function handler(ctx) {
   const { userId } = ctx.params;

   const result = await controller.getOrder({ userId });

   ctx.response.body = result;
}

module.exports = {
   method: 'get',
   url: '/order/:userId',
   schema,
   handler,
};
