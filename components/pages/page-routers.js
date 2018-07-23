import express from 'express';

import pageController from './page-controller';

const router = express.Router();


router.get('/', pageController.fetchAll);

router.post('/', pageController.create);

router.patch('/:id', pageController.update);

router.delete('/:id', pageController.delete);

module.exports = router;
