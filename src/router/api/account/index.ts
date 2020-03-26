import * as Router from 'koa-router';
import v1 from "./v1";

const account = new Router();

account.use('/v1', v1.routes());

export default account;
