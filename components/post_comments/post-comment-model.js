import mongoose from 'mongoose';

const postCommentSchema = mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = {
  PostComment: mongoose.model('PostComment', postCommentSchema),
  postCommentSchema
};
