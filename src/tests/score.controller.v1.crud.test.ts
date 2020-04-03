import * as request from 'supertest';
import app from '..';
import { scoreArchive, user, waitForSync } from '../models';

describe("Dotori's Score API - CRUD", () => {
  const mockUser = {
    pid: 998,
    email: 'a@a.a',
    pw: '1234',
    name: 'name'
  };

  const mockUserAuth = '998';

  const mockInvalidData = {};

  beforeAll(async () => {
    await waitForSync;

    await user.create(mockUser);
  });

  afterAll(async () => {
    await user.destroy({
      where: {
        pid: mockUser.pid
      }
    });
  });

  afterEach(async () => {
    await scoreArchive.destroy({
      where: {}
    });
  });

  describe('When inserting score archive', () => {
    it('throws error when empty data is sent', async () => {
      const response = await request(app.callback())
        .post('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockInvalidData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
    });

    it('throws error when only score column is sent', async () => {
      const mockData = {
        data: {
          score: 1
        }
      };
      const response = await request(app.callback())
        .post('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
    });

    it('throws error when only user_id column is sent', async () => {
      const mockData = {
        data: {
          user_id: mockUser.pid
        }
      };
      const response = await request(app.callback())
        .post('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
    });

    it('throws error when only reason column is sent', async () => {
      const mockData = {
        data: {
          reason: 'None'
        }
      };
      const response = await request(app.callback())
        .post('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
    });

    it('responses correctly when proper data is sent: first case', async () => {
      const mockData = {
        data: {
          score: 1,
          user_id: mockUser.pid,
          reason: 'None'
        }
      };

      const response = await request(app.callback())
        .post('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockData);

      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data.insertedArchive).toBeTruthy();

      const inserted = response.body.data.insertedArchive;

      expect(inserted.score).toEqual(mockData.data.score);
      expect(inserted.user_id).toEqual(mockData.data.user_id);
      expect(inserted.reason).toEqual(mockData.data.reason);
    });

    it('responses correctly when proper data is sent: second case', async () => {
      const mockData = {
        data: {
          score: 1,
          user_id: mockUser.pid
        }
      };

      const response = await request(app.callback())
        .post('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockData);

      expect(response.status).toBe(200);
      expect(response.body.error).toBeFalsy();
      expect(response.body.data.insertedArchive).toBeTruthy();

      const inserted = response.body.data.insertedArchive;

      expect(inserted.score).toEqual(mockData.data.score);
      expect(inserted.user_id).toEqual(mockData.data.user_id);
      expect(inserted.reason).toBeFalsy();
    });
  });

  describe('When updating score archive', () => {
    let mockArchiveID: number;

    const mockInsertedData = {
      score: 3,
      user_id: mockUser.pid,
      reason: 'None'
    };

    const mockUpdatedData = {
      score: -3,
      user_id: mockUser.pid,
      reason: 'I hate him'
    };

    beforeEach(async () => {
      const mocked = await scoreArchive.create(mockInsertedData);

      mockArchiveID = mocked.getDataValue('id');
    });

    afterEach(async () => {
      await scoreArchive.update(mockInsertedData, {
        where: {
          id: mockArchiveID
        }
      });
    });

    it('throws error when empty data is sent', async () => {
      const response = await request(app.callback())
        .put('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockInvalidData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
    });

    it("throws error when data field's value is absence", async () => {
      const mockData = {
        data: {},
        conditions: {
          id: mockArchiveID
        }
      };

      const response = await request(app.callback())
        .put('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
    });

    it('throws error when data field is missing', async () => {
      const mockData = {
        conditions: {
          id: mockArchiveID
        }
      };

      const response = await request(app.callback())
        .put('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
    });

    it('throws error when conditions field is missing', async () => {
      const mockData = {
        data: mockUpdatedData
      };

      const response = await request(app.callback())
        .put('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
    });

    it('responses correctly when proper data is sent', async () => {
      const mockData = {
        data: mockUpdatedData,
        conditions: {
          id: mockArchiveID
        }
      };

      const response = await request(app.callback())
        .put('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockData);

      expect(response.status).toBe(200);
      expect(response.body.data.result).toEqual([1]);

      const updated = await scoreArchive.findOne({
        where: {
          id: mockArchiveID
        },
        raw: true
      });

      expect(updated.user_id).toEqual(mockUpdatedData.user_id);
      expect(updated.score).toEqual(mockUpdatedData.score);
      expect(updated.reason).toEqual(mockUpdatedData.reason);
    });
  });

  describe('When deleting score archive', () => {
    let mockArchiveID: number;

    const mockDeletingData = {
      score: 3,
      user_id: mockUser.pid,
      reason: 'None'
    };

    beforeEach(async () => {
      const mocked = await scoreArchive.create(mockDeletingData);

      mockArchiveID = mocked.getDataValue('id');
    });

    afterEach(async () => {
      await scoreArchive.destroy({
        where: {}
      });
    });

    it('throws error when empty data is sent', async () => {
      const response = await request(app.callback())
        .delete('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockInvalidData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
    });

    it("throws error when conditions field's value is missing", async () => {
      const mockData = {
        conditions: {}
      };

      const response = await request(app.callback())
        .delete('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockData);

      expect(response.status).toBe(500);
      expect(response.body.error).toBeTruthy();
    });

    it('responses correctly when proper data is sent', async () => {
      const mockData = {
        conditions: {
          id: mockArchiveID
        }
      };

      const response = await request(app.callback())
        .delete('/api/score/v1/archive')
        .set('Authorization', mockUserAuth)
        .type('json')
        .send(mockData);

      expect(response.status).toBe(200);
      expect(response.body.data.result).toEqual(1);
      expect(response.body.error).toBeFalsy();

      const afterQueried = await scoreArchive.findOne({
        where: {
          id: mockArchiveID
        }
      });

      expect(afterQueried).toBeFalsy();
    });
  });
});
