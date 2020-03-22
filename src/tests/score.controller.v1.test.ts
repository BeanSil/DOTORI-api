import * as request from 'supertest';
import app from '../';

describe('Dotori\'s Score API', () => {
  describe('When fetching student\'s score', () => {
    it('responses correctly', async () => {
      const response = await request(app.callback()).get('/api/score/v1');
    
      expect(response.body).toBeTruthy();
    });
  });

  describe('When fetching all score archives', () => {
    it('responses correctly', async () => {
      const response = await request(app.callback()).get('/api/score/v1/archive');
    
      expect(response.body).toBeTruthy();
    });
  });

  describe('When inserting score archive', () => {
    it('responses correctly', async () => {
      const response = await request(app.callback()).post('/api/score/v1/archive');
    
      expect(response.body).toBeTruthy();
    });
  });

  describe('When updating score archive', () => {
    it('responses correctly', async () => {
      const response = await request(app.callback()).put('/api/score/v1/archive');
    
      expect(response.body).toBeTruthy();
    });
  });

  describe('When deleting score archive', () => {
    it('responses correctly', async () => {
      const response = await request(app.callback()).delete('/api/score/v1/archive');
    
      expect(response.body).toBeTruthy();
    });
  });
});