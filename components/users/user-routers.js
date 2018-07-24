import express from 'express';

import userController from './user-controller';

const router = express.Router();

router.post('/', userController.create);

router.patch('/:id', userController.update);

router.post('/login', userController.login);

module.exports = router;
