const joi = require('@hapi/joi');
const _ = require('lodash');
const controller = require('../../controller/users');
const { bsDecode } = require('../../services/login');

/* schema */
const schema = joi.object().keys({
   username: joi.string().alphanum().required(),
   password: joi.string().alphanum().required(),
});

/* handler */
async function handler(ctx) {
   let { username, password } = ctx.request.body;

   /* 解码 */
   username = await bsDecode(username);
   password = await bsDecode(password);

   /* 注册用户 */
   const user = await (await controller.login({ username, password })).toObject();

   /* 生成token */
   const token = await controller.createToken(user);

   /* 加入token */
   _.set(user, 'token', token);

   ctx.response.body = user;
}

module.exports = {
   method: 'post',
   url: '/login',
   schema,
   handler,
   isPublic: true,
};
