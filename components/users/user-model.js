import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    const hassedPassword = await bcrypt.hash(user.password, salt);
    user.password = hassedPassword;
    next();
  } else {
    next();
  }
});

userSchema.statics.findByCredenticals = function (email, password) {
  const User = this;
  return new Promise((resolve, reject) => {
    User.findOne({ email }).then(async (doc) => {
      if (!doc) {
        return reject(new Error('The email is incorrect'));
      }
      const comparePassword = await bcrypt.compare(password, doc.password);
      if (comparePassword) {
        resolve(doc);
      } else {
        return reject(new Error('The password is incorrect'));
      }
    }).catch(err => reject(err));
  });
};

module.exports = mongoose.model('User', userSchema);
