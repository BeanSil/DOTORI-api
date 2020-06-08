import * as Router from 'koa-router';

import { getSummary } from "../../../../controller/dormitory.v1.controller";

import { LoginRequired } from '../../../../utils/authorization';

const v1 = new Router();

v1.get('/summary', getSummary);

export default v1;
