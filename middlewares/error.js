const Wroops = require('../common/error');

async function errorHandler(ctx, next) {
   try {
      await next();
   } catch (error) {
      if (error instanceof Wroops) {
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
