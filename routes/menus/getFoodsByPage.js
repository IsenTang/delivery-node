const joi = require('@hapi/joi');
const _ = require('lodash');
const controller = require('../../controller/menu');

/* schema */
const schema = joi.object().keys({});

/* handler */
async function handler(ctx) {
   const { foods, count } = await controller.getFoodsByPage(ctx.request.query);

   ctx.response.body = {
      list: foods,
      count,
   };
}

module.exports = {
   method: 'get',
   url: '/food',
   schema,
   handler,
   isPublic: true,
};
