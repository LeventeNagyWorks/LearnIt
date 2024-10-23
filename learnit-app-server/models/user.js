const mongoose = require('mongoose');

const MUser = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  studySets: [{
    name: String,
    questions: Array,
    isFavorite: {
      type: Boolean,
      default: false
    }
  }]
});

module.exports = mongoose.model('User', MUser);