const joi = require('@hapi/joi');
const controller = require('../../controller/restaurant');

/* schema */
const schema = joi.object().keys({
//    page: joi.string().required(),
//    limit: joi.object().required(),
});

/* handler */
async function handler(ctx) {
   const result = await controller.getNearByRestaurantByPage(ctx.params);

   ctx.response.body = result;
}

module.exports = {
   method: 'get',
   url: '/restaurant/location/:location/page/:page/limit/:limit',
   schema,
   handler,
   isPublic: true,
};
