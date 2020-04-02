import * as request from 'supertest';
import app from '../../';

const api = '/api/music/v1/';

const authKey = '';

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

describe('MusicApply', () => {

  describe('Get music apply list', () => {
    it('get', async () => {
      const response = await request(app.callback()).get(api);
      
      expect(response.status).toBe(200);
      expect(response.body.data).toBeTruthy();
    });
  });

  describe('Apply music', () => {
    it('apply music without data', async () => {
      const response = await request(app.callback())
        .put(api)
        .type('json');

      expect(response.status).toBe(400);
    });

    it('apply music', async () => {
      const response = await request(app.callback())
        .put(api)
        .type('json')
        .send(insertTestData);
      expect(response.status).toBe(200);
    });
  });

  describe('Change status', () => {
    it('user is not administrator', async () => {
      const response = await request(app.callback())
        .put(api)
        .type('json')
        .send(changeStatus);

      expect(response.status).toBe(400);
    });

    it('without status data', async () => {
      const response = await request(app.callback())
        .put(api)
        .set('Authorization', authKey)
        .type('json');

      expect(response.status).toBe(400);
    });

    it('change music status', async () => {
      const response = await request(app.callback())
        .post(api)
        .type('json')
        .set('Authorization', authKey)
        .send(changeStatus);
      expect(response.status).toBe(200);
    });
  });

  describe('Delete music', () => {
    it('user is not administrator', async () => {
      const response = await request(app.callback())
        .put(api)
        .set('Authorization', authKey)
        .type('json');

      expect(response.status).toBe(400);
    });

    it('delete apply music', async () => {
      const response = await request(app.callback())
        .delete(api)
        .type('json')
        .send(deleteTestData);
      expect(response.status).toBe(200);
    });
  });
});
