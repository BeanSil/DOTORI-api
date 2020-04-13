import * as Router from 'koa-router';

import board from './board';
import score from './score';
import laptop from './laptop';

const api = new Router();

api.use('/board', board.routes());
api.use('/score', score.routes());
api.use('/laptop', laptop.routes());

export default api;
