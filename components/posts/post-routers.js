import express from 'express';

import auth from '../middleware/authenticate';
import postController from './post-controller';

const router = express.Router();

router.get('/', auth, postController.fetchAll);

router.post('/', auth, postController.create);

router.post('/:postId/addComment', auth, postController.createPostComment);

router.patch('/:postId/updateComment/:commentId', auth, postController.updatePostComment);

router.delete('/:postId/removeComment/:commentId', auth, postController.removePostComment);

module.exports = router;
