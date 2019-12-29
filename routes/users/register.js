const _ = require('lodash');
const joi = require('@hapi/joi');
const controller = require('../../controller/users');

/* schema */
const schema = joi.object().keys({
  username: joi.string().alphanum().min(3).max(30)
    .required(),
  password: joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});


/* handler */
async function handler(ctx) {
  const { username, password } = ctx.request.body;
  const isDuplicate = await controller.checkDuplicate({ username });

  /* 用户已经存在 */
  if (isDuplicate) {
    throw new Error('user duplicate');
  }

  /* 注册用户 */
  const user = await controller.register({ username, password }).toObject();

  /* 生成token */
  const token = await controller.createToken(user);

  /* add token */
  _.set(user, 'token', token);

  ctx.response.body = user;
}


module.exports = {
  method: 'post',
  url: '/register',
  schema,
  handler,
};
