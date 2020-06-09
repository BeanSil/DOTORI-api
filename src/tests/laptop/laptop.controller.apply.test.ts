import * as request from 'supertest';
import app from '../..';
import { user, waitForSync } from '../../models';

const api = '/api/laptop/v1/';

describe('Laptop Application API', () => {
  const baseData = {
    room: 1,
    seat: 1
  };

  const testUser1 = {
    pid: 10001,
    email: 'student001@gsm.hs.kr',
    pw: 'mypassword1234',
    name: 'test1'
  };

  const testUser2 = {
    pid: 10002,
    email: 'student002@gsm.hs.kr',
    pw: 'mypassword1234',
    name: 'test2'
  };

  const authKey1 = '10001';
  const authKey2 = '10002';

  beforeAll(async done => {
    await waitForSync;

    await user.create(testUser1);
    await user.create(testUser2);

    done();
  });

  afterAll(async done => {
    await user.destroy({ where: { pid: authKey1 } });
    await user.destroy({ where: { pid: authKey2 } });
    done();
  });

  it('is without auth', async () => {
    const response = await request(app.callback())
      .post(api)
      .send(baseData);
    expect(response.status).toBe(401);
  });

  it('is without body', async () => {
    const response = await request(app.callback())
      .post(api)
      .set('Authorization', authKey1);
    expect(response.status).toBe(400);
  });

  it('should be applied', async () => {
    const response = await request(app.callback())
      .post(api)
      .set('Authorization', authKey1)
      .send(baseData);
    expect(response.status).toBe(201);
  });

  it('is rejected because user have reserved', async () => {
    const response = await request(app.callback())
      .post(api)
      .set('Authorization', authKey1)
      .send(baseData);
    expect(response.status).toBe(400);
  });

  it('is rejected because the seat is already reserved', async () => {
    const response = await request(app.callback())
      .post(api)
      .set('Authorization', authKey2)
      .send(baseData);
    expect(response.status).toBe(400);
  });

  it('checks it is reserved', async () => {
    const response = await request(app.callback())
      .get(api)
      .set('Authorization', authKey1);

    expect(response.status).toBe(200);
    expect(response.body.data).toEqual(baseData);
  });

  it('cancels application', async () => {
    const response = await request(app.callback())
      .delete(api)
      .set('Authorization', authKey1);

    expect(response.status).toBe(204);
  });

  it('checks it is not reserved', async () => {
    const response = await request(app.callback())
      .get(api)
      .set('Authorization', authKey1);

    expect(response.status).toBe(404);
  });
});
