const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  username: {
    type: String,
    min: 3,
    max: 50,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'User name is required'],
  },
  email: {
    type: String,
    min: 5,
    max: 50,
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, 'Email is required'],
  },
  password: {
    type: String,
    min: [5, 'Password must be at least 5 characters long'],
    max: 200,
    trim: true,
    required: [true, 'Password is required'],
  },
  name: { type: String, max: 200 },
  picture: { type: String, max: 400, min: 8, trim: true },
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified || !user.isNew) {
    next();
  } else {
    bcrypt.hash(user.password, 10, function (err, hash) {
      if (err) {
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
