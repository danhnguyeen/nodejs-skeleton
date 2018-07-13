const mongoose = require('mongoose');

const Order = require('./order-model');

exports.fetchAll = (req, res) => {
  Order.find().populate('product', 'name').select('_id product quantity').then(docs => {
    res.send(docs);
  }).catch(err => res.status(500).send(err));
};

exports.create = (req, res) => {
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    product: req.body.productId,
    quantity: 1
  });
  order.save().then(doc => {
    res.send(doc);
  }).catch(err => res.status(500).send(err));
};