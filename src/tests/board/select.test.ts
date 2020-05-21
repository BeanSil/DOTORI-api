import * as request from 'supertest';
import app from '../../';
import { post, waitForSync } from '../../models';

const api = '/api/board/v1/notice/postid';

describe('select post', () => {
  let created: any;

  let data: any = {
    post_id: null,
    user_id: 2,
    board_type: 'notice',
    title: '노트북 대여시간 변경',
    content: '노트북 대여시간이 변경됩니다.',
    is_anonymous: false
  };

  beforeAll(async () => {
    await waitForSync;
    created = (await post.create(data)).post_id;
    console.log(created);
    data.post_id = created;
  });

  afterAll(async () => {
    await post.destroy({ where: { post_id: created } });
  });

  test('normal case', async () => {
    const response = await request(app.callback()).get(
      api.replace('postid', created)
    );
    delete response.body.data.createdAt;
    delete response.body.data.updatedAt;
    expect(response.body.data).toEqual(data);
  });

  test('wrong post id', async () => {
    const response = await request(app.callback()).get(api);
    expect(response.status).toBe(400);
  });

  test('post not exist', async () => {
    const response = await request(app.callback()).get(
      api.replace('postid', created + 1)
    );
    expect(response.status).toBe(404);
  });
});
