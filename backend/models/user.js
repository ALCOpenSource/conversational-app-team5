const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
});

const User = mongoose.model('users', schema);

module.exports = User;