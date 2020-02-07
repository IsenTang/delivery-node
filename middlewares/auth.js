const _ = require('lodash');
const { findOne } = require('../db/users');
const { decode } = require('../services/login');
const { canon } = require('../utils/utils');
const Woops = require('../common/error');

/* 验证中间件 */
async function auth(ctx, next) {
   const { authorization } = ctx.header;

   /* 如果头部不带有token信息 */
   if (!authorization) {
      throw new Woops('auth-failed', 'You need login first.');
   }

   /* 解码token */
   try {
      const decoded = decode(authorization);

      const id = _.get(decoded, 'data._id');

      /* 查找用户信息 */
      const user = await findOne({ _id: canon(id) });

      /* 用户不存在 */
      if (!user) {
         throw new Woops('auth-failed', 'You need login first.');
      }
   } catch (error) {
      throw new Woops('auth-failed', 'You need login first.');
   } finally {
      await next();
   }
}

module.exports = auth;
