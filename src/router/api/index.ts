import * as Router from 'koa-router';
import score from './score';

const api = new Router();

api.use('/score', score.routes());

export default api;