import mongoose from 'mongoose';

module.exports = (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw Error('Not found');
  }
  next();
};
