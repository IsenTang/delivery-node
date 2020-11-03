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

/* custom middlewares */
const errorMiddleware = require('./middlewares/error');

const config = require('./config');
const routes = require('./routes');

const port = process.env.PORT || config.port;

const connection = require('./utils/connection');
require('./utils/supportColors');

/*
 * mongodb
 */
connection.initConnection();

// error handler
app.use(errorMiddleware);

// middlewares
app.use(bodyparser())
   .use(json())
   .use(logger())
   .use(cors({
      credentials: true,
   }))
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

// app.on('error', (err, ctx) => {
//    // console.error(err);
// });

module.exports = app.listen(config.port, () => {
   debug(`Listening on http://localhost:${port}`);
});
