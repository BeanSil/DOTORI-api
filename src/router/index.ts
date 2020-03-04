import * as Router from 'koa-router';
import score from './score';

const index = new Router();

index.use('/score', score.routes());

export default index;