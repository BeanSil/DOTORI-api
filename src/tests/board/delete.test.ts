import * as request from 'supertest';
import app from '../../';
import { post, user, waitForSync } from '../../models';

const api = '/api/board/v1/postid';

let authKey: any;
describe('delete post', () => {
  let created: any;

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

  beforeEach(async done => {
    const testPost = await post.create({
      user_id: authKey,
      board_type: '공지사항',
      title: '노트북 대여시간 변경',
      content: '노트북 대여시간이 변경됩니다.',
      is_anonymous: false
    });
    created = testPost.post_id;
    done();
  });

  afterEach(async done => {
    await post.destroy({ where: { post_id: created } });
    done();
  });

  test('with wrong post id', async () => {
    const response = await request(app.callback())
      .delete(api)
      .set('Authorization', authKey);

    expect(response.status).toBe(404);
  });

  test('normal case', async () => {
    const response = await request(app.callback())
      .delete(api.replace('postid', created))
      .set('Authorization', authKey);
    expect(response.status).toBe(200);
  });
});
