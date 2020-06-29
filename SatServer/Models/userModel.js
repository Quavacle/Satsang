const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

let UserSchema = new Schema({
  username: {
    type: String,
    min: 3,
    max: 50,
    trim: true,
    lowercase: true,
  },
  email: {
    type: String,
    min: 5,
    max: 50,
    trim: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    min: 5,
    max: 200901,
    trim: true,
  },
  name: { type: String, max: 200 },
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified || !user.isNew) {
    next();
  } else {
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
        console.log('Hashing error for:', user.username);
        next(err);
      } else {
        user.password = hash;
        next();
      }
    });
  }
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
