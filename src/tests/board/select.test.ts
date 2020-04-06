import { Map } from 'immutable';
import * as request from 'supertest';
import app from '../../';
import { post, waitForSync } from '../../models';

const api = '/api/board/v1/postid';

describe('select post', () => {

  let created: any;

  let data = Map<any>({
    user_id: 2,
    board_type: '공지사항',
    title: '노트북 대여시간 변경',
    content: '노트북 대여시간이 변경됩니다.',
    is_anonymous: false
  });

  beforeAll(async () => {
    await waitForSync;
    created = (await post.create(data)).post_id;
    data.set('post_id', created);
  });

  afterAll(async () => {
    await post.destroy({where: {post_id: created}})
  });

  test('normal case', async () => {
    const response = await request(app.callback()).get(api.replace('postid', created));

    expect(response.body.data).toStrictEqual(data)
  });

  test('wrong post id', async () => {
    const response = await request(app.callback()).get(api);
    expect(response.status).toBe(400)
  });

  test('post not exist', async () => {
    const response = await request(app.callback()).get(api.replace('postid', created + 1));
    expect(response.status).toBe(400)
  })
});