import * as request from 'supertest';
import app from '../..';
import { user, waitForSync, laptop } from '../../models';

const api = '/api/laptop/v1/room';

describe('Room Check API', () => {
  const testUser1 = {
    pid: 10003,
    email: 'student001@gsm.hs.kr',
    pw: 'mypassword1234',
    name: 'tester1'
  };

  const testUser2 = {
    pid: 10004,
    email: 'student002@gsm.hs.kr',
    pw: 'mypassword1234',
    name: 'tester2'
  };

  const authKey1 = '10003';
  const authKey2 = '10004';

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

  afterEach(async done => {
    await laptop.destroy({ where: { user_id: authKey1 } });
    await laptop.destroy({ where: { user_id: authKey2 } });
    done();
  });

  it('checks room list with no reservation', async () => {
    const response = await request(app.callback()).get(api);
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({
      reserveCount: [0, 0, 0, 0, 0]
    });
  });

  it('checks room list with reservation', async () => {
    await laptop.create({
      user_id: authKey1,
      room: 5,
      seat: 1
    });
    await laptop.create({
      user_id: authKey2,
      room: 5,
      seat: 2
    });

    const response = await request(app.callback()).get(api);
    expect(response.status).toBe(200);
    expect(response.body.data).toEqual({
      reserveCount: [0, 0, 0, 0, 2]
    });
  });

  it('is with wrong room number', async () => {
    const response = await request(app.callback()).get(api + '/0');
    expect(response.status).toBe(400);
  });

  it('is when there is no reservation - without detail', async () => {
    const response = await request(app.callback()).get(api + '/2');
    expect(response.status).toBe(200);
    expect(response.body.data.seats).toEqual([]);
  });

  it('is when there is no reservation - with detail', async () => {
    const response = await request(app.callback())
      .get(api + '/detail/2')
      .set('Authorization', authKey1);
    expect(response.status).toBe(200);
    expect(response.body.data.details).toEqual([]);
  });

  it('is when there is reservation - without detail', async () => {
    await laptop.create({
      user_id: authKey1,
      room: 3,
      seat: 1
    });
    await laptop.create({
      user_id: authKey2,
      room: 3,
      seat: 2
    });

    const response = await request(app.callback()).get(api + '/3');
    expect(response.status).toBe(200);
    expect(response.body.data.seats).toEqual([1, 2]);
  });

  it('is when there is reservation - with detail', async () => {
    await laptop.create({
      user_id: authKey1,
      room: 4,
      seat: 1
    });
    await laptop.create({
      user_id: authKey2,
      room: 4,
      seat: 2
    });

    const response = await request(app.callback())
      .get(api + '/detail/4')
      .set('Authorization', authKey1);
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
