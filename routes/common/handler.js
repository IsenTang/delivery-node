const _ = require('lodash');
const Shit = require('../../utils/error');

/* 处理router */
async function routerHandler({
  schema, handler,
}, ctx) {
  if (!_.isEmpty(schema)) {
    const result = schema.validate(ctx.request.body);

    if (result.error) {
      ctx.throw('request-body-invalid', 'request-body-invalid', { details: result.error.details });
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
