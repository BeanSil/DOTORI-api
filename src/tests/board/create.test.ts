import * as request from 'supertest';
import app from '../../';

test('create without body', async () => {
  const response = await request(app.callback()).get('/');
  expect(response.status).toBe(403);
  expect(response.text).toBe('Forbidden');
});
