const _ = require('lodash');
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

   switch (method) {
   case 'get':
      return router.get(url, async (ctx, next) => {
         await routerHandler(data, ctx);
      });
   case 'post':
      return router.post(url, async (ctx, next) => {
         await routerHandler(data, ctx);
      });
   case 'put':
      return router.put(url, async (ctx, next) => {
         await routerHandler(data, ctx);
      });
   case 'delete':
      return router.delete(url, async (ctx, next) => {
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
