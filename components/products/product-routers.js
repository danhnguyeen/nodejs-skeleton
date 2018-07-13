const express = require('express');
const router = express.Router();
const multer = require('multer');

const auth = require('../middleware/authenticate');
const productController = require('./product-controller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});
const fileFilter = (req, file, cb) => {
  if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ 
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5 
  }, 
  fileFilter: fileFilter
});

router.get('/', productController.fetchAll);

router.post('/', auth, upload.single('image'), productController.create);

router.get('/:id', productController.findById);

router.patch('/:id', auth, productController.update);

router.delete('/:id', auth, productController.delete);

module.exports = router;
