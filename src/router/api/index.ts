import * as Router from 'koa-router';
import account from "./account";

const api = new Router();

api.use('/account', account.routes());

export default api;
