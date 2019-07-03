const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true
  },
  name: {
  	type: String
  },
  email: {
    type: String,
    unique: true
  },
  age: {
  	type: Number,
  },
  phone: {
  	type: Number
  },
  gender: {
    type: String
  },
  address: {
  	type: String
  }
});

const user = mongoose.model('userData', userSchema);

module.exports = user;