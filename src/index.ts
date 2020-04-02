// import Koa.js related package
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';

import router from './router';
import sessionCreator from './middlewares/session';

const app = new Koa();

app.use(logger());
app.use(bodyParser());
app.use(sessionCreator);
app.use(router.routes()).use(router.allowedMethods());

export default app;
