import _ from 'lodash';
import mongoose from 'mongoose';

import { Page, validate } from './page-model';

exports.fetchAll = async (req, res) => {
  const docs = await Page.find();
  res.send(docs);
};

exports.fetchById = async (req, res) => {
  const doc = await Page.findById(req.params.id);
  if (!doc) {
    throw Error('Not found');
  }
  res.send(doc);
};

exports.create = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(400).send(error.details);
  }
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const opts = { session, new: true };
    const page = new Page(_.pick(req.body, ['title', 'content']));
    const doc = await page.save(opts);
    doc.$session();
    const pageaa = new Page({
      // title: 'aaaa',
      content: 'bbb'
    });
    await pageaa.save(opts);
    await session.commitTransaction();
    session.endSession();
    res.send(doc);
  } catch (e) {
    await session.abortTransaction();
    session.endSession();
    throw e;
  }
};

exports.update = async (req, res) => {
  const doc = await Page.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
  res.send(doc);
};

exports.delete = async (req, res) => {
  const result = await Page.remove({ _id: req.params.id });
  res.send(result);
};
