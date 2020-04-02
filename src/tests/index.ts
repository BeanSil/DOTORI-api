// 이 스크립트는 모든 테스트 전에 실행됩니다.
// DB 백업이나, 환경 변수 설정 등의 역할을 합니다.

import * as dotenv from 'dotenv';

import * as path from 'path';
dotenv.config({ path: path.join(__dirname, `'/.env.test`) });
dotenv.config();