/* eslint-disable */
import server from '../../server';
import request from 'supertest';
import mongoose from 'mongoose';
import { Page } from '../../components/pages'


afterAll(async () => {
  await server.close();
});

describe('/pages', () => {
  afterEach( async () => {
    await Page.remove({});
  });
  describe('GET /', () => {
    it('should return all pages', async () => {
      await Page.collection.insertMany([
        { title: 'Page 1', content: 'Page content 1' },
        { title: 'Page 2', content: 'Page content 2' }
      ]);
      const res = await request(server).get('/pages');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
    });
  });
  describe('GET /:id', () => {
    it('should return a page', async () => {
      const page = new Page({
        title: 'Title 1',
        content: 'Page content 1'
      });
      await page.save();
      const res = await request(server).get(`/pages/${page._id}`);
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', page.title);
    });
    it('should return erro 404', async () => {
      const res = await request(server).get(`/pages/1`);
      expect(res.status).toBe(404);
    });
  });
});