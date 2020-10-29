const joi = require('@hapi/joi');
const controller = require('../../controller/menu');

/* schema */
const schema = joi.object().keys({
   id: joi.string().required(),
   data: joi.object().required(),
});

/* handler */
async function handler(ctx) {
   const result = await controller.updateFood(ctx.request.body);

   ctx.response.body = result;
}

module.exports = {
   method: 'post',
   url: '/food',
   schema,
   handler,
   isPublic: true,
};
