const joi = require('@hapi/joi');
const controller = require('../../controller/orders');

/* schema */
const schema = joi.object().keys();

/* handler */
async function handler(ctx) {
   const result = await controller.getOrderByQuery(ctx.request.query);

   ctx.response.body = result;
}

module.exports = {
   method: 'get',
   url: '/order',
   schema,
   isPublic: true,
   handler,
};
