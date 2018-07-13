import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';

import { productRouters } from './components/products';
import { orderRouters } from './components/orders';
import { userRouters } from './components/users';

const app = express();

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, { useNewUrlParser: true });

/* public uploads images */
app.use('/uploads', express.static(`${__dirname}/uploads`));
/* HTTP request logger middleware */
app.use(morgan('dev'));
// parse application/json
app.use(bodyParser.json());
/* Handling CORS */
app.use((req, res, next) => {
  /* replace "*" by static domain instead */
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  return next();
});

app.use('/products', productRouters);
app.use('/orders', orderRouters);
app.use('/users', userRouters);

/* Handle Error Messages */
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  res.status(err.status || 500).send({
    message: err.message,
    status: err.status
  });
});

module.exports = app;
