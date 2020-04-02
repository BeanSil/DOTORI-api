import * as request from 'supertest';
import app from '../../';
import { post, waitForSync } from '../../models';
import { Op } from 'sequelize';

const api = '/api/board/v1/';

describe('select all post', () => {
  beforeAll(async done => {
    await waitForSync;
    await post.destroy({ where: {} });
    for (let i = 0; i < 3; i++) {
      await post.create({
        user_id: 2,
        board_type: '공지사항',
        title: '노트북 대여시간 변경',
        content: '노트북 대여시간이 변경됩니다.',
        is_anonymous: false
      });
    }
    done();
  });

  afterAll(async done => {
    await post.destroy({ where: {} });
  });

  test('normal case', async () => {
    const response = await request(app.callback()).get(api);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(3);
  });
});
