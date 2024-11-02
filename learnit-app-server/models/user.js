const mongoose = require('mongoose');

const MUser = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  studySets: [{
    name: String,
    questions: [{
      _id: false,
      question: String,
      answer: Array,
      right_answer: Array,
      que_type: String,
      correctCount: {
        type: Number,
        default: 0
      },
      learningState: {
        type: String,
        enum: ['notStarted', 'learning', 'mastered'],
        default: 'notStarted'
      }
    }],
    isFavorite: {
      type: Boolean,
      default: false
    }
  }]
});

module.exports = mongoose.model('User', MUser);