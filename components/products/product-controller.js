import _ from 'lodash';

import Product from './product-model';

exports.fetchAll = (req, res) => {
  Product.find().sort([['_id', 'descending']])
    .then(docs => res.send(docs));
};

exports.findById = async (req, res) => {
  const doc = await Product.findById(req.params.id).select('name price _id');
  if (!doc) {
    throw Error('Not found');
  }
  return res.send(doc);
};

exports.create = async (req, res) => {
  const body = _.pick(req.body, ['code', 'name', 'price', 'description']);
  body.image = req.file.filename;
  const product = new Product(body);
  const doc = await product.save();
  res.send(doc);
};

exports.update = async (req, res) => {
  /* { new: true } return updated doc */
  const doc = await Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
  res.send(doc);
};

exports.delete = async (req, res) => {
  const result = await Product.remove({ _id: req.params.id });
  res.send(result);
};
