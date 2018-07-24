import mongoose from 'mongoose';

import { postCommentSchema } from '../post_comments';

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [postCommentSchema]
});

module.exports = mongoose.model('Post', postSchema);
