import { Map } from 'immutable';
import * as request from 'supertest';
import app from '../../';

const api = '/api/board/v1/';

const authKey = '';

test('create without body', async () => {
  const response = await request(app.callback())
    .post(api)
    .set('Authorization', authKey);
  expect(response.status).toBe(400);
});
});
