const joi = require('@hapi/joi');
const controller = require('../../controller/restaurant');

/* schema */
const schema = joi.object().keys({
   id: joi.string().required(),
   data: joi.object().required(),
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
