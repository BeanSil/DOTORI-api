import * as Router from 'koa-router';

import v1 from './v1';

const board = new Router();

board.use('/v1', v1.routes());

export default board;
