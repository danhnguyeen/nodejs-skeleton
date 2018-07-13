const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { productRouters } = require('./components/products');
const { orderRouters } = require('./components/orders');
const { userRouters } = require('./components/users');

const DB_NAME = process.env.DB_NAME;
mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, { useNewUrlParser: true });

/* public uploads images */
app.use('/uploads', express.static(__dirname + '/uploads'));
/* HTTP request logger middleware */
app.use(morgan('dev'));
// parse application/json
app.use(bodyParser.json());
/* Handling CORS */
app.use((req, res, next) => {
  /* replace "*" by static domain instead */
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
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
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({
    message: err.message,
    status: err.status
  });
});

module.exports = app;
