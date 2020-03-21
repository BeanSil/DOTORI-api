import * as Router from 'koa-router';

import v1 from './v1';

const laptop = new Router();

laptop.use('/v1', v1.routes());

export default laptop;