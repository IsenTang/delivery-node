const _ = require('lodash');
const auth = require('../../middlewares/auth');
const Woops = require('../../common/error');

/* 处理router */
async function routerHandler({
   schema, handler,
}, ctx) {
   if (!_.isEmpty(schema)) {
      /* 先做schema检查 */
      const result = schema.validate(ctx.request.body);

      if (result.error) {
         throw new Woops('request-body-invalid', 'request-body-invalid', result.error.details);
      }
   }

   await handler(ctx);
}

/* 封装router，加入joi做schema检查 */
async function endpoint(data, router) {
   const {
      method, url,
   } = data;

   /* 如果public为true，不需要登录验证就可以访问 */
   const { isPublic } = data;

   switch (method) {
   case 'get':
      /* 注入中间件，在请求开始时，验证用户登录态。 */
      return router.get(url, isPublic ? async (ctx, next) => {
         await next();
      } : auth, async (ctx, next) => {
         await routerHandler(data, ctx);
      });
   case 'post':
      return router.post(url, isPublic ? async (ctx, next) => {
         await next();
      } : auth, async (ctx, next) => {
         await routerHandler(data, ctx);
      });
   case 'put':
      return router.put(url, isPublic ? async (ctx, next) => {
         await next();
      } : auth, async (ctx, next) => {
         await routerHandler(data, ctx);
      });
   case 'delete':
      return router.delete(url, isPublic ? async (ctx, next) => {
         await next();
      } : auth, async (ctx, next) => {
         await routerHandler(data, ctx);
      });
   default:
      break;
   }

   return null;
}

module.exports = {
   endpoint,
};
