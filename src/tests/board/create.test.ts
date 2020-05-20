import { Map } from 'immutable';
import * as request from 'supertest';
import app from '../../';
import { user, waitForSync } from '../../models';

const api = '/api/board/v1/:board';

let authKey: any;

describe('create post', () => {
  const baseData = Map<any>({
    title: '노트북 대여시간 변경',
    content: '노트북 대여시간이 변경됩니다.',
    is_anonymous: false
  });

  const boardType = 'notice';

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
      .put(api.replace(':board', boardType))
      .set('Authorization', authKey);
    expect(response.status).toBe(400);
  });

  test('without user', async () => {
    const response = await request(app.callback())
      .put(api.replace(':board', boardType))
      .send(baseData);
    expect(response.status).toBe(401);
  });

  test('with wrong body', async () => {
    const response = await request(app.callback())
      .put(api.replace(':board', encodeURI('dcinside')))
      .set('Authorization', authKey)
      .send(baseData);
    expect(response.status).toBe(400);
  });

  test('normal case', async () => {
    const response = await request(app.callback())
      .put(api.replace(':board', boardType))
      .set('Authorization', authKey)
      .send(baseData);
    expect(response.status).toBe(201);
    expect(response.body.isCreated).toBe(true);
    expect(response.body.data).toBeDefined();
  });
});
