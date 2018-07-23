import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  price: {
    type: Number,
    min: 0,
    default: 0
  },
  description: String,
  image: String
});

productSchema.post('save', (error, doc, next) => {
  if (error && error.name === 'MongoError' && error.code === 11000) {
    next({
      message: 'Product code is already exist',
      code: 500
    });
  } else {
    next(error);
  }
});

module.exports = mongoose.model('Product', productSchema);
