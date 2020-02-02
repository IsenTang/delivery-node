const Woops = require('../common/error');

/* 错误处理 */
async function errorHandler(ctx, next) {
   try {
      await next();
   } catch (error) {
      if (error instanceof Woops) {
         ctx.status = 500;
         ctx.body = {
            code: error.status,
            message: error.message,
            details: error.details,
         };
      }
   }
}

module.exports = errorHandler;
