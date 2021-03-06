import _ from 'lodash';
import jwt from 'jsonwebtoken';

import User from './user-model';

exports.create = async (req, res) => {
  const user = new User(_.pick(req.body, ['email', 'password']));
  const doc = await user.save();
  res.send(doc);
};

exports.update = async (req, res) => {
  const doc = await User.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  res.send(doc);
};

exports.login = async (req, res) => {
  const doc = await User.findByCredenticals(req.body.email, req.body.password);
  const token = jwt.sign(
    {
      email: doc.email,
      id: doc._id
    },
    process.env.JWT_KEY,
    { expiresIn: '1d' }
  );
  const user = jwt.decode(token, process.env.JWT_KEY);
  /* res.header('x-auth-token': token).send(user) */
  res.send({ token, user });
};
