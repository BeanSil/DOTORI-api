import * as Router from 'koa-router';
import music from './music';

const api = new Router();

api.use('./music',music.routes());

export default api;
