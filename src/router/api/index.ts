import * as Router from 'koa-router';

import laptop from './laptop';

const api = new Router();

api.use('/laptop', laptop.routes());

export default api;
