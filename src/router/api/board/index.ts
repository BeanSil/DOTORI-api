import * as Router from 'koa-router';

import v1 from './v1';

const board = new Router();

board.use('/api', v1.routes());

export default board;
