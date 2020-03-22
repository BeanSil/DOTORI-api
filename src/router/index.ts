import * as Router from 'koa-router';

import api from './api';
import { Context } from 'koa';

const index = new Router();

// 이 파일은 편집하지 마세요.
index.use('/api', api.routes());

index.all('/', (ctx: Context) => {
  ctx.status = 403;
});

export default index;
