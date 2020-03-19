import * as Router from 'koa-router';

import v1 from './v1'

const music = new Router();

music.use('/v1', v1.routes());

export default music;