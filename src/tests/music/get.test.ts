import * as request from 'supertest';
import app from '../..';

const api = '/api/music/v1/';

test('GET Music apply list', async () => {
  const response = await request(app.callback())
    .get(api);
  expect(response.status).toBe(200);
});
