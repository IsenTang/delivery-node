const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

const json = require('koa-json');
// const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const cors = require('koa2-cors');
const debug = require('debug')('koa2:server');
const Wroops = require('./common/error');

const config = require('./config');
const routes = require('./routes');

const port = process.env.PORT || config.port;

const connection = require('./utils/connection');
require('./utils/supportColors');

// error handler
app.use(async (ctx, next) => {
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
});

/*
 * mongodb
 */
connection.initConnection();

// middlewares
app.use(bodyparser())
   .use(json())
   .use(logger())
   .use(cors())
// .use(require('koa-static')(`${__dirname}/public`))
   .use(router.routes())
   .use(router.allowedMethods());

// logger
app.use(async (ctx, next) => {
   const start = new Date();
   await next();
   const ms = new Date() - start;
   console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

/*
 * Routers
 */
routes(router);

app.on('error', (err, ctx) => {
   console.log(err);
});

module.exports = app.listen(config.port, () => {
   debug(`Listening on http://localhost:${port}`);
});
