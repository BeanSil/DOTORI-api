import * as request from 'supertest';
import app from '../../';
import { post, waitForSync } from '../../models';

const api = '/api/board/v1/notice/';

beforeAll(async done => {
  await waitForSync;
  done();
});

describe('select all post', () => {
  beforeAll(async done => {
    await post.destroy({ where: {} });
    let arr = [];
    for (let i = 0; i < 3; i++) {
      arr.push({
        user_id: 2,
        board_type: 'notice',
        title: '노트북 대여시간 변경',
        content: '노트북 대여시간이 변경됩니다.',
        is_anonymous: false
      });
    }

    console.log(arr);

    await post.bulkCreate(arr);
    done();
  });

  afterAll(async done => {
    await post.destroy({ where: {} });
    done();
  });

  test('normal case', async done => {
    const response = await request(app.callback()).get(api);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(3);
    done();
  });
});

describe('select all post by page', () => {
  beforeAll(async done => {
    await post.destroy({ where: {} });
    let arr = [];
    for (let i = 0; i < 30; i++) {
      arr.push({
        user_id: 2,
        board_type: 'notice',
        title: '노트북 대여시간 변경',
        content: '노트북 대여시간이 변경됩니다.',
        is_anonymous: false
      });
    }

    await post.bulkCreate(arr);
    done();
  });

  afterAll(async done => {
    await post.destroy({ where: {} });
    done();
  });

  test('normal case - without page - maxed out', async () => {
    const response = await request(app.callback()).get(api);
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(20);
  });

  test('normal case - with page - maxed out', async () => {
    const response = await request(app.callback()).get(api + 'page/0/');
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(20);
  });

  test('normal case - with page - half', async () => {
    const response = await request(app.callback()).get(api + 'page/1/');
    expect(response.status).toBe(200);
    expect(response.body.data).toHaveLength(10);
  });
});
