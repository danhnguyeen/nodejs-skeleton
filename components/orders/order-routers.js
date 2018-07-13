import express from 'express';

import orderController from './order-controller';

const router = express.Router();


router.get('/', orderController.fetchAll);

router.post('/', orderController.create);

module.exports = router;
