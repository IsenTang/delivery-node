const joi = require('@hapi/joi');
const controller = require('../../controller/orders');
// const {  } = require('../../services/orders');

/* schema */
const schema = joi.object().keys({
   payment: joi.string().alphanum().required(),
   cart: joi.array().required(),
   user: joi.object().required(),
   restaurant: joi.object().required(),
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
