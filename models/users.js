const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
  token: { 
    type: String,
    default: '',
  },
  avatar: 
  { type: String,
    default: '',
  }

});

const User = mongoose.model('users', userSchema);

module.exports = User;