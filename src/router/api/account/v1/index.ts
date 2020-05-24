import * as Router from 'koa-router';
import {createSession, getUserBySession} from "../../../../controller/account.v1.controller";
import {LoginRequired, MustNotLoggedIn} from "../../../../utils/authorization";

const v1 = new Router();

v1.get('/session', LoginRequired, getUserBySession);
v1.put('/session', MustNotLoggedIn, createSession);

export default v1;
