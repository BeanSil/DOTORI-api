import * as Router from 'koa-router';

import account from "./account";
import music from './music';
import board from './board';
import score from './score';
import laptop from './laptop';

const api = new Router();

api.use('/account', account.routes());
api.use('/music', music.routes());
api.use('/board', board.routes());
api.use('/score', score.routes());
api.use('/laptop', laptop.routes());

export default api;
