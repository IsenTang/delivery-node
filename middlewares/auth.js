const _ = require('lodash');
const Router = require('koa-router');
const { findOne } = require('../db/users');
const { decode } = require('../services/login');
const { canon } = require('../utils/utils');

/* 验证失败 */
function authFailed(ctx) {
   ctx.status = 500;
   ctx.body = {
      code: 'auth-failed',
      message: 'You need login first.',
      details: {},
   };
}

/* 验证中间件 */
async function auth(ctx, next) {
   try {
      const { authorization } = ctx.header;

      /* 如果头部不带有token信息 */
      if (!authorization) {
         authFailed(ctx);
         return;
      }

      /* 解码token */
      const decoded = decode(authorization);

      const id = _.get(decoded, 'data._id');

      /* 查找用户信息 */
      const user = await findOne({ _id: canon(id) });

      /* 用户不存在 */
      if (!user) {
         authFailed(ctx);
         return;
      }

      /* token是否过期 */
      const exp = _.get(decoded, 'exp');

      if (exp > new Date().getTime()) {
         authFailed(ctx);
         return;
      }

      await next();
   } catch (error) {
      _.noop();
   }
}

module.exports = auth;
