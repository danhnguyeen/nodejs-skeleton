/* eslint-disable */
import request from 'supertest';

import { Page } from '../../components/pages'
import { User } from '../../components/users'

let server;
describe('/pages', () => {
  beforeEach(() => server = require('../../server'));
  afterEach( async () => {
    await Page.remove({});
    server.close();
  });
  
  describe('GET /', () => {
    it('should return all pages', async () => {
      const pages = [
        { title: 'Page 1', content: 'Page content 1' },
        { title: 'Page 2', content: 'Page content 2' }
      ];
      await Page.collection.insertMany(pages);
      const res = await request(server).get('/pages');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });

  describe('GET /:id', () => {
    it('should return a page', async () => {
      const doc = new Page({
        title: 'Title 1 aaa',
        content: 'Page content 1'
      });
      await doc.save();
      const res = await request(server).get(`/pages/${doc._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', doc.title);
    });
    it('should return error 404', async () => {
      const res = await request(server).get(`/pages/1`);
      expect(res.status).toBe(404);
    });
  });

  describe('POST /', () => {
    let token;
    let page;
    beforeEach(() => {
      token = User.generateAuthToken({ _id: 1, email: 'test' });
      page = {
        title: 'Test title',
        content: 'Test content'
      }
    });
    const exec = async () => {
      return await request(server)
        .post('/pages')
        .set('authorization', `Bearer ${token}`)
        .send(page);
    }

    it('should return 401 if the client is not logined in', async () => {
      token = '';
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it('should return 400 if the title is empty', async () => {
      page = {
        title: ''
      }
      const res = await exec();
      expect(res.status).toBe(400);
    });

    it('should save the page if it is valid', async () => {
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id', res.body._id);
      expect(res.body).toHaveProperty('title', 'Test title');
    });
  })
});