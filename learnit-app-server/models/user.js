const mongoose = require('mongoose');

const MUser = new mongoose.Schema({
    username: String,
    displayName: {
        type: String,
        default: function() {
            return this.username
        }
    },
    email: String,
    password: String,
    description: {
        type: String,
        default: "This is my description. You can edit it anytime. Have a nice day! ✌️"
    },
    avatar: {
        type: String,
        default: null
    },
    allMastered: {
        type: Number,
        default: 0
    },
    allLearning: {
        type: Number,
        default: 0
    },
    allNotStarted: {
        type: Number,
        default: 0
    },
    friendRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
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
            wrongCount: {
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