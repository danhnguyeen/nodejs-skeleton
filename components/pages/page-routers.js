import express from 'express';

import auth from '../middleware/authenticate';
import validateObjectId from '../middleware/validate-objectId';
import pageController from './page-controller';

const router = express.Router();

router.get('/', pageController.fetchAll);

router.get('/:id', validateObjectId, pageController.fetchById);

router.post('/', auth, pageController.create);

router.patch('/:id', auth, pageController.update);

router.delete('/:id', auth, pageController.delete);

module.exports = router;
