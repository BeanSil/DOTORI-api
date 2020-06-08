import * as Router from 'koa-router';

import v1 from './v1';

const dormitory = new Router();

dormitory.use('/v1', v1.routes());

export default dormitory;
