import * as Router from 'koa-router';
import v1 from './v1';

const score = new Router();

score.use('/v1', v1.routes());

export default score;