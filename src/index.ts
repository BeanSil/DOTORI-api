import * as dotenv from 'dotenv';

// import Koa.js related package
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';

import router from './router';
import sessionCreator from './middlewares/session';

// 환경 변수 로드
dotenv.config();

const app = new Koa();

// setting port
const port = process.env.PORT || 5000;

app.use(logger());
app.use(bodyParser());
app.use(sessionCreator);
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
