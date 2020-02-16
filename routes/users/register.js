const joi = require('@hapi/joi');
const controller = require('../../controller/users');
const Woops = require('../../common/error');

const { bsDecode } = require('../../services/login');

/* schema */
const schema = joi.object().keys({
   username: joi.string().alphanum()
      .required(),
   password: joi.string().alphanum().required(),
});

/* handler */
async function handler(ctx) {
   let { username, password } = ctx.request.body;

   /* 解码 */
   username = await bsDecode(username);
   password = await bsDecode(password);

   const isDuplicate = await controller.checkDuplicate({ username });

   /* 用户已经存在 */
   if (isDuplicate) {
      throw new Woops('user-duplicate', 'user duplicate');
   }

   /* 注册用户 */
   const user = await (await controller.register({ username, password })).toObject();

   ctx.response.body = user;
}

module.exports = {
   method: 'post',
   url: '/user/register',
   schema,
   handler,
   isPublic: true,
};
