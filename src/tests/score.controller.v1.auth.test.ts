import * as request from 'supertest';
import app from '..';
import { user, waitForSync } from '../models';

describe("Dotori's Score API - Authorization", () => {
  const mockUser = {
    pid: 999,
    email: 'a@a.a',
    pw: '1234',
    name: 'name'
  };

  const mockUserAuth = '999';

  const mockInvalidData = {};

  beforeAll(async () => {
    await waitForSync;

    await user.create(mockUser);
  });

  afterAll(async () => {
    await user.destroy({
      where: { pid: mockUser.pid }
    });
  });

  describe("When fetching student's score", () => {
    it('throws error when user is not exists or not student', async () => {
      const response = await request(app.callback()).get('/api/score/v1');

      expect(response.status).toBe(401);
      expect(response.body.error).toBeTruthy();
      expect(response.body.error.message).toBe(
        "User who is not student can't access to this request."
      );
    });

    it('responses correctly when proper user exists', async () => {
      const response = await request(app.callback())
        .get('/api/score/v1')
        .set('Authorization', mockUserAuth);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeTruthy();
    });
  });

  describe('When fetching all score archives', () => {
    it('throws error when user is not exists or not admin', async () => {
      const response = await request(app.callback()).get(
        '/api/score/v1/archive'
      );

      expect(response.status).toBe(401);
      expect(response.body.error).toBeTruthy();
      expect(response.body.error.message).toBe(
        "User who is not administrator can't access to this request."
      );
    });

    it('responses correctly when proper user exists', async () => {
      const response = await request(app.callback())
        .get('/api/score/v1/archive')
        .set('Authorization', mockUserAuth);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeTruthy();
    });
  });

  describe('When inserting score archive', () => {
    it('throws error when user is not exists or not admin', async () => {
      const response = await request(app.callback()).post(
        '/api/score/v1/archive'
      );

      expect(response.status).toBe(401);
      expect(response.body.error).toBeTruthy();
      expect(response.body.error.message).toBe(
        "User who is not administrator can't access to this request."
      );
    });

    it('throws error when sent data is invalid', async () => {
      const response = await request(app.callback())
        .post('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockInvalidData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
    });
  });

  describe('When updating score archive', () => {
    it('throws error when user is not exists or not admin', async () => {
      const response = await request(app.callback()).put(
        '/api/score/v1/archive'
      );

      expect(response.status).toBe(401);
      expect(response.body.error).toBeTruthy();
      expect(response.body.error.message).toBe(
        "User who is not administrator can't access to this request."
      );
    });

    it('throws error when sent data is invalid', async () => {
      const response = await request(app.callback())
        .put('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockInvalidData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
    });
  });

  describe('When deleting score archive', () => {
    it('throws error when user is not exists or not admin', async () => {
      const response = await request(app.callback()).delete(
        '/api/score/v1/archive'
      );

      expect(response.status).toBe(401);
      expect(response.body.error).toBeTruthy();
      expect(response.body.error.message).toBe(
        "User who is not administrator can't access to this request."
      );
    });

    it('throws error when sent data is invalid', async () => {
      const response = await request(app.callback())
        .delete('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockInvalidData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
    });
  });
});
