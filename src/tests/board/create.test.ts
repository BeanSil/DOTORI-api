import { Map } from 'immutable';
import * as request from 'supertest';
import app from '../../';
import { user, waitForSync } from '../../models';

const api = '/api/board/v1/';

let authKey: any;

describe('create post', () => {
  const baseData = Map<any>({
    board_type: '공지사항',
    title: '노트북 대여시간 변경',
    content: '노트북 대여시간이 변경됩니다.',
    is_anonymous: false
  });

  beforeAll(async done => {
    await waitForSync;
    const testUser = await user.create({
      email: 'somedummymail@gsm.hs.kr',
      pw: 'somedummypassword',
      name: '고익종'
    });
    authKey = testUser.pid;
    done();
  });

  afterAll(async done => {
    await user.destroy({ where: { pid: authKey } });
    done();
  });

  test('without body', async () => {
    const response = await request(app.callback())
      .put(api)
      .set('Authorization', authKey);
    expect(response.status).toBe(400);
  });

  test('without user', async () => {
    const response = await request(app.callback())
      .put(api)
      .type('form')
      .send(baseData);
    expect(response.status).toBe(400);
  });

  test('with wrong body', async () => {
    let newData = baseData;
    newData.set('board_type', '주식갤러리');
    const response = await request(app.callback())
      .put(api)
      .set('Authorization', authKey)
      .type('form')
      .send(newData);
    expect(response.status).toBe(400);
  });

  test('normal case', async () => {
    const response = await request(app.callback())
      .put(api)
      .set('Authorization', authKey)
      .send(baseData);
    expect(response.status).toBe(201);
    expect(response.body.isCreated).toBe(true);
    expect(response.body.data).toBeDefined();
  });
});
