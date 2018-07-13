import express from 'express';
import multer from 'multer';

import auth from '../middleware/authenticate';
import productController from './product-controller';

const router = express.Router();

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
