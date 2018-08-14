import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import config from 'config';
import 'express-async-errors';

import { productRouters } from './components/products';
import { orderRouters } from './components/orders';
import { userRouters } from './components/users';
import { pageRouters } from './components/pages';
import { postRouters } from './components/posts';

const app = express();

mongoose.connect(config.get('DB_NAME'), { useNewUrlParser: true });
mongoose.connection.on('open', () => (
  console.log(`Connected to database ${config.get('DB_NAME')}!`)
));

/* public uploads images */
app.use('/uploads', express.static(`${__dirname}/uploads`));
/* HTTP request logger middleware */
// if (app.get('env') === 'development') {
app.use(morgan('dev'));
// }
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
app.use('/pages', pageRouters);
app.use('/posts', postRouters);

/* Handle Error Messages */
app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});
// app.use((err, req, res) => {
//   res.status(err.status || 500).send({
//     message: err.message,
//     status: err.status
//   });
// });
app.use((err, req, res, next) => {
  switch (err.message) {
    case 'Not found':
      res.status(404);
      break;
    case 'Access deny':
      res.status(401);
      break;
    default: res.status(500);
  }
  res.send({ message: err.message || 'Some thing went wrong', error: err });
  // next(err);
});
module.exports = app;
