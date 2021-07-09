const joi = require('@hapi/joi');
const controller = require('../../controller/admin');

/* schema */
const schema = joi.object().keys({
   username: joi.string().alphanum().required(),
   password: joi.string().alphanum().required(),
});

/* handler */
async function handler(ctx) {
   const user = await controller.login(ctx.request.body);

   ctx.response.body = user;
}

module.exports = {
   method: 'post',
   url: '/admin/login',
   schema,
   handler,
   isPublic: true,
};
