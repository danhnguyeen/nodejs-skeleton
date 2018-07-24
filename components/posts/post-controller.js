import Post from './post-model';
import { PostComment } from '../post_comments';

exports.fetchAll = (req, res) => {
  Post.find()
    .then(docs => res.send(docs))
    .catch(err => res.status(500).send(err));
};

exports.create = (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    user: req.user.id
  });
  post.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(500).send(err));
};

exports.createPostComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    post.comments.push(new PostComment({
      user: req.user.id,
      content: req.body.content
    }));
    await post.save();
    res.send();
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.removePostComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    await post.comments.id(req.params.commentId).remove();
    await post.save();
    res.send(post);
  } catch (err) {
    res.status(500).send(err);
  }
};
