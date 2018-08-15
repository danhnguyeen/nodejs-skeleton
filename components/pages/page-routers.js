import express from 'express';

import validateObjectId from '../middleware/validate-objectId';
import pageController from './page-controller';

const router = express.Router();

router.get('/', pageController.fetchAll);

router.get('/:id', validateObjectId, pageController.fetchById);

router.post('/', pageController.create);

router.patch('/:id', pageController.update);

router.delete('/:id', pageController.delete);

module.exports = router;
