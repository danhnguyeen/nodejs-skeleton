/* eslint-disable */
process.env.DB_NAME = 'ShoppingCardTest';
process.env.NODE_ENV = 'test';
// import mongoose from 'mongoose';
// import assert from 'assert';
import chai from 'chai';
import chaiHttp from 'chai-http';
// import request from 'supertest';
import 'babel-polyfill';
import app from '../app';
// import { Page } from '../components/pages';

const should = chai.should();
chai.use(chaiHttp);

beforeEach(() => {
  // mongoose.connection.collections.pages.drop();
});
describe('Auth', function () {

});

describe('Pages', function () {
  // describe('POST /pages', () => {
  //   it('should create new page', function (done) {
  //     const page = new Page({
  //       title: 'Test 1',
  //       content: 'Test content'
  //     });
  //     request(app)
  //       .post('/pages')
  //       .send(page)
  //       .end((err, res) => {
  //         should.not.exist(err);
  //         // res.should.have.status(200);
  //         res.body.should.be.an('object');
  //         // res.body.title.
  //         done();
  //       });
  //   });
  // });
  describe('GET /pages', () => {
    it('should create new page', async function () {
      const res = await chai.request(app).get('/pages');
      res.should.have.status(200);
      res.body.should.be.an('array');
    });
  });
});
