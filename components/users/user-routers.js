import express from 'express';

import userController from './user-controller';

const router = express.Router();

router.post('/', userController.create);

router.post('/login', userController.login);

module.exports = router;
