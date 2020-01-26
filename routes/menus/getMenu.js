const joi = require('@hapi/joi');
const _ = require('lodash');
const controller = require('../../controller/menu');

/* schema */
const schema = joi.object().keys({});

/* handler */
async function handler(ctx) {
   const { restaurantId } = ctx.params;

   const result = await controller.getMenu({ restaurantId });

   ctx.response.body = result;
}

module.exports = {
   method: 'get',
   url: '/menu/restaurantId/:restaurantId',
   schema,
   handler,
};
