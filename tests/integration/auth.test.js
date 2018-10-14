/* eslint-disable */
import request from 'supertest';

import { Page } from '../../components/pages'
import { User } from '../../components/users'

let server;
describe('auth middleware', () => {
  beforeEach( async () => {
    server = await require('../../server');
  });
  afterEach( async () => {
    await Page.remove({});
  });
  afterAll( async () => {
    await server.close();
  });
  
  let token;
  beforeEach(() => {
    token = User.generateAuthToken({ _id: 1, email: 'test' });
  });

  const exec = () => {
    return request(server).post('/pages')
      .set('authorization', `Bearer ${token}`)
      .send({ title: 'Test title', content: 'Test content' });
  }
  it('should return 401 if no token is provided', async () => {
    token = '';
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it('should return 401 if no token is provided', async () => {
    token = null;
    const res = await exec();
    expect(res.status).toBe(401);
  });

  it('should return 200 if token is valid', async () => {
    const res = await exec();
    expect(res.status).toBe(200);
  });
});