import mongoose from 'mongoose';

import Order from './order-model';

exports.fetchAll = async (req, res) => {
  const docs = await Order.find().populate('product', 'name').select('_id product quantity');
  res.send(docs);
};

exports.create = async (req, res) => {
  const order = new Order({
    _id: mongoose.Types.ObjectId(),
    product: req.body.productId,
    quantity: 1
  });
  const doc = await order.save();
  res.send(doc);
};
