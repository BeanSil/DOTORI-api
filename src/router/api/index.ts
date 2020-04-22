import * as Router from 'koa-router';

import board from './board';
import score from './score';
import { Context } from 'koa';

const api = new Router();

api.use('/board', board.routes());
api.use('/score', score.routes());

api.get('/', (ctx: Context) => {
  ctx.status = 200;
});

export default api;
