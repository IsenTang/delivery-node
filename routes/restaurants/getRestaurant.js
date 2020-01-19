const joi = require('@hapi/joi');
const _ = require('lodash');
const controller = require('../../controller/restaurant');

/* schema */
const schema = joi.object().keys({});

/* handler */
async function handler(ctx) {
   const { location } = ctx.query;

   const result = await controller.getNearByRestaurant({ location });

   ctx.response.body = result;
}

module.exports = {
   method: 'get',
   url: '/restaurant',
   schema,
   handler,
};
