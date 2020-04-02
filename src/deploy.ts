// 이 파일은 코드가 서버로써 실행되어야 할 때 실행됩니다.

// koa 관련 스크립트를 실행하기 전에 환경 변수를 로드해야 합니다. 이에, app은 .env 설정 후에 import 합니다.
/* eslint-disable import/first */
import * as path from 'path';

import * as dotenv from 'dotenv';

// 기존의 .env 파일은 글로벌 설정으로 사용할 수 있습니다.
dotenv.config();

// 각 실행 환경에 따라 바뀌는 설정은 .env.test 형식의 파일에 넣어주세요.
dotenv.config({ path: path.join(__dirname, `'/.env.${process.env.NODE_ENV}`) });

import app from './';
/* eslint-enable import/first */

const port = process.env.PORT || 5000;

if (process.env.JEST_WORKER_ID === undefined) {
  app.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
} else console.log('Test server running...');
