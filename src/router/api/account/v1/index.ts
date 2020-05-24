import * as Router from 'koa-router';
import {
  createSession, createUser,
  deleteSession, deleteUser,
  getUserBySession, modifyUser
} from '../../../../controller/account.v1.controller';
import {
  LoginRequired,
  MustNotLoggedIn
} from '../../../../utils/authorization';

const v1 = new Router();

v1.get('/session', LoginRequired, getUserBySession);
v1.put('/session', MustNotLoggedIn, createSession);
v1.delete('/session', LoginRequired, deleteSession); // 로그아웃
v1.put('/user', MustNotLoggedIn, createUser); // 회원가입
v1.post('/user', LoginRequired, modifyUser); // 회원 정보 수정
v1.delete('/user', MustNotLoggedIn, deleteUser); // 회원 탈퇴

export default v1;
