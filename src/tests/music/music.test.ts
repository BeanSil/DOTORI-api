import * as request from 'supertest';
import app from '../../';
import { music, user, waitForSync } from '../../models';

const api = '/api/music/v1/';

const insertTestData = {
  user_id: 1,
  music: 'musicTitle',
  singer: 'musicSinger',
  link: 'www.musiclink.com'
};

const changeStatus = {
  data: {
    status: 1
  },
  conditions: {
    id: 4
  }
};

const deleteTestData = {
  id: 4
};

const User = {
  pid: 997,
  email: 'test@test.com',
  pw: '0000',
  name: 'testname'
};

const authKey = '997';

beforeAll(async () => {
  await waitForSync;

  await user.create(User);
});

afterAll(async () => {
  await user.destroy({
    where: { pid: User.pid }
  });
});

afterEach(async () => {
  await music.destroy({
    where: {}
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

      expect(response.status).toBe(500);
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
    it('user is not administrator', async () => {
      const response = await request(app.callback()).put(api);

      expect(response.status).toBe(500);
    });

    it('without status data', async () => {
      const response = await request(app.callback())
        .put(api)
        .set('Authorization', authKey)
        .type('json');

      expect(response.status).toBe(500);
    });

    it('change music status', async () => {
      const response = await request(app.callback())
        .put(api)
        .type('json')
        .set('Authorization', authKey)
        .send(changeStatus);
      expect(response.status).toBe(202);
    });
  });

  describe('Delete music', () => {
    it('without music id data', async () => {
      const response = await request(app.callback()).delete(api);

      expect(response.status).toBe(500);
    });

    it('delete apply music', async () => {
      const response = await request(app.callback())
        .delete(api)
        .type('json')
        .send(deleteTestData);

      expect(response.status).toBe(204);
    });
  });
});
