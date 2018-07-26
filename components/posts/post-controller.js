import _ from 'lodash';

import Post from './post-model';
import { PostComment } from '../post_comments';

exports.fetchAll = async (req, res) => {
  const docs = await Post.find();
  res.send(docs);
};

exports.create = async (req, res) => {
  const post = new Post({ ..._.pick(req.body, ['title', 'conent']), user: req.user.id });
  const doc = await post.save();
  res.send(doc);
};

exports.createPostComment = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  post.comments.push(new PostComment({
    user: req.user.id,
    content: req.body.content
  }));
  await post.save();
  res.send();
};

exports.updatePostComment = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  const comment = await post.comments.id(req.params.commentId);
  comment.content = req.body.content;
  await post.save();
  res.send(post);
};


exports.removePostComment = async (req, res) => {
  const post = await Post.findById(req.params.postId);
  await post.comments.id(req.params.commentId).remove();
  await post.save();
  res.send(post);
};
