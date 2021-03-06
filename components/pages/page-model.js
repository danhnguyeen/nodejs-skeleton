import mongoose from 'mongoose';

const pageSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required field'],
    trim: true,
    minlength: 1
  },
  content: {
    type: String
  }
});

module.exports = mongoose.model('Page', pageSchema);
