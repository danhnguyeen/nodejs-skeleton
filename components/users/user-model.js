const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

userSchema.pre('save', async function(next) {
  var user = this;
  if(user.isModified('password')) {
    let salt = await bcrypt.genSalt(10);
    let hassedPassword = await bcrypt.hash(user.password, salt);
    user.password = hassedPassword;
    next();
  } else {
    next();
  }
});

userSchema.statics.findByCredenticals = function(email, password) {
  const User = this;
  return new Promise( (resolve, reject) => {
    User.findOne({ email }).then(async (doc) => {
      if(!doc) {
        return reject({ message: 'The email is incorrect' });
      } 
      let comparePassword = await bcrypt.compare(password, doc.password);
      if(comparePassword) {
        resolve(doc);
      } else {
        reject({ message: 'The password is incorrect' });
      }
    }).catch(err => reject(err));
  });
}
module.exports = mongoose.model('User', userSchema);