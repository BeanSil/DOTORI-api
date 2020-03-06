import * as Router from 'koa-router';

import api from './api';

const index = new Router();

// 이 파일은 편집하지 마세요.
index.use('/api', api.routes());

export default index;