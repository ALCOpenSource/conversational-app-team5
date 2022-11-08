const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },

  phone_number: String,

  email: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  },

  user_type: {
    type: String,
    enum: ["user", "author"],
    required: true
  }
  },
  {
  timestamps: true
  }
);

const User = mongoose.model('users', schema);

module.exports = User;