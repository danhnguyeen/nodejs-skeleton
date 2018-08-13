import _ from 'lodash';

import Product from './product-model';

exports.fetchAll = (req, res) => {
  Product.find().sort([['_id', 'descending']])
    .then(docs => res.send(docs))
    .catch(err => res.status(500).send(err));
};

exports.create = (req, res) => {
  const body = _.pick(req.body, ['code', 'name', 'price', 'description']);
  body.image = req.file.filename;
  const product = new Product(body);
  product.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(500).send(err));
};

exports.findById = (req, res) => {
  Product.findById(req.params.id).select('name price _id')
    .then((doc) => {
      if (!doc) {
        return res.status(404).send();
      }
      return res.send(doc);
    }).catch(err => res.status(500).send(err));
};

exports.update = (req, res) => {
  /* { new: true } return updated doc */
  Product.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err));
};

exports.delete = (req, res) => {
  Product.remove({ _id: req.params.id })
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err));
};
