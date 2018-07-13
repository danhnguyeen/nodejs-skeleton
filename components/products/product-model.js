import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: String,
  price: {
    type: Number,
    required: true,
    min: 0
  },
  image: String
});

module.exports = mongoose.model('Product', productSchema);