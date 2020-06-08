import { Context } from 'koa';
import * as Router from 'koa-router';

import account from './account';
import board from './board';
import laptop from './laptop';
import music from './music';
import score from './score';

const api = new Router();

api.use('/account', account.routes());
api.use('/music', music.routes());
api.use('/board', board.routes());
api.use('/score', score.routes());
api.use('/laptop', laptop.routes());

api.get('/', (ctx: Context) => {
  ctx.status = 200;
});

export default api;
