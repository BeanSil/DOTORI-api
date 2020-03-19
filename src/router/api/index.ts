import * as Router from 'koa-router';
import music_apply from './music_apply';

const api = new Router();

api.use('./music_apply',music_apply.routes());

export default api;