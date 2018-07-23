import mongoose from 'mongoose';

import Product from './product-model';

exports.fetchAll = (req, res) => {
  Product.find().sort([['_id', 'descending']])
    .then(docs => res.send(docs))
    .catch(err => res.status(500).send(err));
};

exports.create = (req, res) => {
  const product = new Product({
    _id: mongoose.Types.ObjectId(),
    code: req.body.code,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    image: req.file.filename
  });
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
