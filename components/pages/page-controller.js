import _ from 'lodash';

import Page from './page-model';

exports.fetchAll = (req, res) => {
  Page.find()
    .then(docs => res.send(docs))
    .catch(err => res.status(500).send(err));
};

exports.create = (req, res) => {
  const page = new Page(_.pick(req.body, ['title', 'content']));
  page.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(500).send(err));
};

exports.update = (req, res) => {
  Page.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err));
};

exports.delete = (req, res) => {
  Page.remove({ _id: req.params.id })
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err));
};
