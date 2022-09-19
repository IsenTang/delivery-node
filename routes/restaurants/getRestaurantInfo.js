const joi = require('@hapi/joi');
const controller = require('../../controller/restaurant');

/* schema */
const schema = joi.object().keys({});

/* handler */
async function handler(ctx) {
   const result = await controller.getRestaurantInfo(ctx.params);

   ctx.response.body = result;
}

module.exports = {
   method: 'get',
   url: '/restaurant/:id',
   schema,
   handler,
   isPublic: true,
};
