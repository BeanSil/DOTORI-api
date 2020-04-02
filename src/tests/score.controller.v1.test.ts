import * as request from 'supertest';
import app from '../';

const mockInsertedData = {
  data: {
    score: 4,
    user_id: 1,
    reason: "그냥 그러고 싶어서"
  }
};

const mockUpdatingData = {
  data: {
    score: -99,
    user_id: 1,
    reason: "갑자기"
  },
  conditions: {
    id: 1
  }
};

const mockDeletingData = {
  conditions: {
    id: 1
  }
};

describe('Dotori\'s Score API', () => {
  describe('When fetching student\'s score', () => {
    it('expected error when user is not exists or not student', async () => {
      const response = await request(app.callback())
        .get('/api/score/v1');

      expect(response.status).toBe(401);
      expect(response.body.error).toBeTruthy();
      expect(response.body.error.message).toBe('User who is not student can\'t access to this request.');
    });

    it('responses correctly when propeer user exists', async () => {
      const response = await request(app.callback())
        .get('/api/score/v1')
        .set('Authorization', '1');

      expect(response.status).toBe(200);
      expect(response.body.data).toBeTruthy();
    });
  });

  describe('When fetching all score archives', () => {
    it('expected error when user is not exists or not admin', async () => {
      const response = await request(app.callback())
        .get('/api/score/v1/archive');

      expect(response.status).toBe(401);
      expect(response.body.error).toBeTruthy();
      expect(response.body.error.message).toBe('User who is not administrator can\'t access to this request.');
    });

    it('responses correctly when propeer user exists', async () => {
      const response = await request(app.callback())
        .get('/api/score/v1/archive')
        .set('Authorization', '1');

      expect(response.status).toBe(200);
      expect(response.body.data).toBeTruthy();
    });
  });

  describe('When inserting score archive', () => {
    it('expected error when user is not exists or not admin', async () => {
      const response = await request(app.callback())
        .post('/api/score/v1/archive');

      expect(response.status).toBe(401);
      expect(response.body.error).toBeTruthy();
      expect(response.body.error.message).toBe('User who is not administrator can\'t access to this request.');
    });

    it('responses correctly when proper user exists', async () => {
      const response = await request(app.callback())
        .post('/api/score/v1/archive')
        .set('Authorization', '1')
        .type('json')
        .send(mockInsertedData);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeTruthy();
    });
  });

  describe('When updating score archive', () => {
    it('expected error when user is not exists or not admin', async () => {
      const response = await request(app.callback())
        .put('/api/score/v1/archive');

      expect(response.status).toBe(401);
      expect(response.body.error).toBeTruthy();
      expect(response.body.error.message).toBe('User who is not administrator can\'t access to this request.');
    });

    it('responses correctly when proper user exists', async () => {
      const response = await request(app.callback())
        .put('/api/score/v1/archive')
        .set('Authorization', '1')
        .type('json')
        .send(mockUpdatingData);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeTruthy();
    });
  });

  describe('When deleting score archive', () => {
    it('expected error when user is not exists or not admin', async () => {
      const response = await request(app.callback())
        .delete('/api/score/v1/archive');

      expect(response.status).toBe(401);
      expect(response.body.error).toBeTruthy();
      expect(response.body.error.message).toBe('User who is not administrator can\'t access to this request.');
    });

    it('responses correctly when proper user exists', async () => {
      const response = await request(app.callback())
        .delete('/api/score/v1/archive')
        .set('Authorization', '1')
        .type('json')
        .send(mockDeletingData);

      expect(response.status).toBe(200);
      expect(response.body.data).toBeTruthy();
    });
  });
});