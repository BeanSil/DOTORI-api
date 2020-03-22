/* eslint-disable import/first */
// 환경 변수 로드
import * as dotenv from 'dotenv';
dotenv.config();

// 환경 변수가 먼저 로드되야 하므로 dotenv.config()가 다른 import 문보다 먼저 실행되야 합니다.
// 이는 코딩 컨벤션에 위반되나, 어쩔 수 없는 부분이므로 검사하지 않습니다.
// 더 나은 방안이 제시되면 변경될 것입니다.

// import Koa.js related package
import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';

import router from './router';
import { sessionCreator, errorHandling } from './middlewares';

/* eslint-enable import/first */

const app = new Koa();

// setting port
const port = process.env.PORT || 5000;

app.use(errorHandling);
app.use(bodyParser());
app.use(sessionCreator);
app.use(router.routes()).use(router.allowedMethods());

app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
