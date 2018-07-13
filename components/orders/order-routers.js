const express = require('express');
const router = express.Router();

const orderController = require('./order-controller');

router.get('/', orderController.fetchAll);

router.post('/', orderController.create);

module.exports = router;
