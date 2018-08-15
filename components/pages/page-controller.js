import _ from 'lodash';

import Page from './page-model';

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
  const page = new Page(_.pick(req.body, ['title', 'content']));
  const doc = await page.save();
  res.send(doc);
};

exports.update = async (req, res) => {
  const doc = await Page.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
  res.send(doc);
};

exports.delete = async (req, res) => {
  const result = await Page.remove({ _id: req.params.id });
  res.send(result);
};
