import * as Router from 'koa-router';

import board from './board';

const api = new Router();

api.use('/board', board.routes());

export default api;
