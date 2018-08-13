import jwt from 'jsonwebtoken';

import User from './user-model';

exports.create = (req, res) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save()
    .then(doc => res.send(doc))
    .catch(err => res.status(500).send(err));
};

exports.update = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true, runValidators: true })
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err));
};

exports.login = (req, res) => {
  User.findByCredenticals(req.body.email, req.body.password).then((doc) => {
    const token = jwt.sign({
      email: doc.email,
      id: doc._id
    },
    process.env.JWT_KEY,
    {
      expiresIn: '1d'
    });
    const user = jwt.decode(token, process.env.JWT_KEY);
    res.send({ token, user });
  }).catch(err => res.status(401).send(err));
};
