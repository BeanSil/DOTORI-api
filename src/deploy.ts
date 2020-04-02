// 이 파일은 코드가 서버로써 실행되어야 할 때 실행됩니다.

// koa 관련 스크립트를 실행하기 전에 환경 변수를 로드해야 합니다. 이에, app은 .env.deploy 설정 후에 import 합니다.
/* eslint-disable import/first */
import * as path from 'path';

import * as dotenv from 'dotenv';

// 각 환경에서만 필요한 변수를 가져옵니다.
dotenv.config({ path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`) });

// 모든 환경에서 사용되는 변수를 불러옵니다.
// override는 되지 않습니다.
dotenv.config();

import app from './';
/* eslint-enable import/first */

const port = process.env.PORT || 5000;

if (process.env.JEST_WORKER_ID === undefined) {
  app.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
} else console.log('Test server running...');
