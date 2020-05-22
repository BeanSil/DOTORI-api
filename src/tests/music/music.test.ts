import * as request from 'supertest';
import app from '../../';
import { music, user, waitForSync } from '../../models';

const api = '/api/music/v1/';
const url = '/api/music/v1/id';

const insertTestData = {
  user_id: 1,
  music: 'musicTitle',
  singer: 'musicSinger',
  link: 'www.musiclink.com'
};

let changeStatus: any = {
  status: 1
};

let authKey: any;

let id: any;

beforeAll(async done => {
  await waitForSync;

  const testUser = await user.create({
    email: 'test@test.com',
    pw: '0000',
    name: 'test'
  });
  authKey = testUser.pid;
  done();
});

afterEach(async () => {
  await music.destroy({
    where: {}
  });
});

afterAll(async () => {
  await user.destroy({
    where: { pid: authKey }
  });
});

describe('MusicApply', () => {
  describe('Get music apply list', () => {
    it('get', async () => {
      const response = await request(app.callback()).get(api);

      expect(response.status).toBe(200);
    });
  });

  describe('Apply music', () => {
    it('apply music without data', async () => {
      const response = await request(app.callback())
        .post(api)
        .type('json');

      expect(response.status).toBe(400);
    });

    it('apply music', async () => {
      const response = await request(app.callback())
        .post(api)
        .type('json')
        .send(insertTestData);
      expect(response.status).toBe(201);
    });
  });

  describe('Change status', () => {
    beforeEach(async () => {
      id = (
        await music.create({
          user_id: authKey,
          music: 'testmusic',
          singer: 'musicSinger test',
          link: 'TestLink'
        })
      ).id;
    });

    afterEach(async () => {
      await music.destroy({ where: { id: id } });
    });

    it('user is not administrator', async () => {
      const response = await request(app.callback()).put(url.replace('id', id));

      expect(response.status).toBe(400);
    });

    it('without status data', async () => {
      const response = await request(app.callback())
        .put(url.replace('id', id))
        .set('Authorization', authKey)
        .type('json');

      expect(response.status).toBe(400);
    });

    it('change music status', async () => {
      const response = await request(app.callback())
        .put(url.replace('id', id))
        .set('Authorization', authKey)
        .send(changeStatus)
        .type('json');
      expect(response.status).toEqual(202);
    });
  });

  describe('Delete music', () => {
    beforeEach(async done => {
      const testmusic = await music.create({
        user_id: authKey,
        music: 'testmusic',
        singer: 'musicSinger test',
        link: 'TestLink'
      });
      id = testmusic.id;
      done();
    });

    afterEach(async done => {
      await music.destroy({ where: { id: id } });
      done();
    });

    it('wr music id data', async () => {
      const response = await request(app.callback())
        .delete(url)
        .set('Authorization', authKey);

      expect(response.status).toBe(404);
    });

    it('delete apply music', async () => {
      const response = await request(app.callback())
        .delete(url.replace('id', id))
        .set('Authorization', authKey);

      expect(response.status).toBe(204);
    });
  });
});
