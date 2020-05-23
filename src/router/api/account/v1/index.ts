import * as Router from 'koa-router';
import { getUserBySession } from "../../../../controller/account.v1.controller";
import { LoginRequired } from "../../../../utils/authorization";

const v1 = new Router();

v1.get('/session', LoginRequired, getUserBySession)

export default v1;
