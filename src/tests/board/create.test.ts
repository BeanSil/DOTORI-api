import { Map } from 'immutable';
import * as request from 'supertest';
import app from '../../';

const api = '/api/board/v1/';

const authKey = '';

describe('create post', () => {
  const baseData = Map<any>({
    board_type: '공지사항',
    title: '노트북 대여시간 변경',
    content: '노트북 대여시간이 변경됩니다.',
    is_anonymous: false
  });
  test('create post without body', async () => {
    const response = await request(app.callback())
      .post(api)
      .set('Authorization', authKey);
    expect(response.status).toBe(400);
  });

  test('create post without user', async () => {
    const response = await request(app.callback())
      .post(api)
      .type('form')
      .send(baseData);
    expect(response.status).toBe(400);
  });

  test('create post with wrong body', async () => {
    let newData = baseData;
    newData.set('board_type', '주식갤러리');
    const response = await request(app.callback())
      .post(api)
      .set('Authorization', authKey)
      .type('form')
      .send(newData);
    expect(response.status).toBe(400);
  });

  test('create post', async () => {
    const response = await request(app.callback())
      .post(api)
      .set('Authorization', authKey)
      .type('form')
      .send(baseData);
    expect(response.status).toBe(201);
    expect(response.body.isCreated).toBe(true);
    expect(response.body.data).toBeDefined();
  });
});
