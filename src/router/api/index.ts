import * as Router from 'koa-router';

import board from './board';
import score from './score';

const api = new Router();

api.use('/board', board.routes());
api.use('/score', score.routes());

export default api;
