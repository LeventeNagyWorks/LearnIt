const mongoose = require('mongoose');

const MUser = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  studySets: [{
    name: String,
    questions: [{
      _id: String,
      question: String,
      que_type: String,
      right_answer: [String],
      answer: [String]
    }]
  }]
});

module.exports = mongoose.model("user", MUser);