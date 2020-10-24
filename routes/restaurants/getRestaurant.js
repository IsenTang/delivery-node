const joi = require('@hapi/joi');
const controller = require('../../controller/restaurant');

/* schema */
const schema = joi.object().keys({});

/* handler */
async function handler(ctx) {
   const result = await controller.getNearByRestaurant(ctx.params);

   ctx.response.body = result;
}

module.exports = {
   method: 'get',
   url: '/restaurant/location/:location',
   schema,
   handler,
   isPublic: true,
};
