const joi = require('@hapi/joi');
const controller = require('../../controller/orders');

/* schema */
const schema = joi.object().keys({
   payment: joi.string().alphanum().required(),
   cart: joi.array().required(),
   userId: joi.string().required(),
   restaurantId: joi.string().required(),
});

/* handler */
async function handler(ctx) {
   const data = ctx.request.body;

   const result = await controller.placeOrder({ data });

   ctx.response.body = result;
}

module.exports = {
   method: 'put',
   url: '/order',
   schema,
   handler,
};
