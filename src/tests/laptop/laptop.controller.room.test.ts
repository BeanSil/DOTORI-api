import * as request from 'supertest';
import app from '../..';
import { user, waitForSync, laptop } from '../../models';

const api = '/api/laptop/v1/room';

describe('Room Check API', () => {
  const testUser1 = {
    pid: 10001,
    email: 'student001@gsm.hs.kr',
    pw: 'mypassword1234',
    name: 'tester1'
  };

  const testUser2 = {
    pid: 10002,
    email: 'student002@gsm.hs.kr',
    pw: 'mypassword1234',
    name: 'tester2'
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
    await laptop.drop();
    done();
  });

  it('is with wrong room number', async () => {
    const response = await request(app.callback()).get(api + '/0');
    expect(response.status).toBe(400);
  });

  it('is when there is no reservation - without detail', async () => {
    const response = await request(app.callback()).get(api + '/1');
    expect(response.status).toBe(200);
    expect(response.body.data.seats).toEqual([]);
  });

  it('is when there is no reservation - with detail', async () => {
    const response = await request(app.callback()).get(api + '/detail/1');
    expect(response.status).toBe(200);
    expect(response.body.data.details).toEqual([]);
  });

  it('is when there is reservation - without detail', async () => {
    await laptop.create({
      user_id: 10001,
      room: 1,
      seat: 1
    });
    await laptop.create({
      user_id: 10002,
      room: 1,
      seat: 2
    });

    const response = await request(app.callback()).get(api + '/1');
    expect(response.status).toBe(200);
    expect(response.body.data.seats).toEqual([1, 2]);
  });

  it('is when there is reservation - with detail', async () => {
    const response = await request(app.callback()).get(api + '/detail/1');
    expect(response.status).toBe(200);
    expect(response.body.data.details).toEqual([
      {
        grade: null,
        class: null,
        number: null,
        name: 'tester1',
        seat: 1
      },
      {
        grade: null,
        class: null,
        number: null,
        name: 'tester2',
        seat: 2
      }
    ]);
  });
});
