import * as request from 'supertest';
import app from '../../';
import { post, user, waitForSync } from '../../models';

const api = '/api/board/v1/notice/postid';

let authKey: any;

describe('update post', () => {
  let created: any;

  let toBe: any = {
    board_type: 'notice',
    title: '노트북 대여시간 변경함',
    content: '노트북 대여시간이 변경했음.',
    is_anonymous: false
  };

  beforeAll(async () => {
    await waitForSync;
    const testUser = await user.create({
      email: 'somedummymail@gsm.hs.kr',
      pw: 'somedummypassword',
      name: '고익종'
    });
    authKey = testUser.pid;
  });

  beforeEach(async () => {
    created = (
      await post.create({
        user_id: authKey,
        board_type: 'notice',
        title: '노트북 대여시간 변경',
        content: '노트북 대여시간이 변경됩니다.',
        is_anonymous: false
      })
    ).post_id;
  });

  afterEach(async () => {
    await post.destroy({ where: { post_id: created } });
  });

  test('normal case', async () => {
    const response = await request(app.callback())
      .post(api.replace('postid', created))
      .set('Authorization', authKey)
      .send(toBe);
    delete response.body.data.createdAt;
    delete response.body.data.updatedAt;
    toBe.post_id = created;
    toBe.user_id = authKey;
    expect(response.body.data).toEqual(toBe);
  });

  test('wrong post id', async () => {
    const response = await request(app.callback())
      .post(api)
      .set('Authorization', authKey);
    expect(response.status).toBe(400);
  });

  test('post not exist', async () => {
    const response = await request(app.callback())
      .post(api.replace('postid', created + 1))
      .set('Authorization', authKey);
    expect(response.status).toBe(404);
  });
});
