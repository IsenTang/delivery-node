const joi = require('@hapi/joi');
const controller = require('../../controller/restaurant');

/* schema */
const schema = joi.object().keys({
   id: joi.string().required(),
   data: joi.object({
      name: joi.object().optional(),
      hours: joi.array().optional(),
      tags: joi.array().optional(),
      closed: joi.object().allow(null),
   }).required(),
});

/* handler */
async function handler(ctx) {
   const result = await controller.updateRestaurant(ctx.request.body);

   ctx.response.body = result;
}

module.exports = {
   method: 'post',
   url: '/restaurant',
   schema,
   handler,
   isPublic: true,
};
