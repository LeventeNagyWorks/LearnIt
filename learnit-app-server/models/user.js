const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

let defaultProfileImage = '';
try {
  const imagePath = path.join(__dirname, '../images/default_profile_pic.png');
  if (fs.existsSync(imagePath)) {
    defaultProfileImage = fs.readFileSync(imagePath).toString('base64');
  } else {
    console.warn('Default profile image not found, using empty string');
    defaultProfileImage = '';
  }
} catch (error) {
  console.error('Error loading default profile image:', error);
  defaultProfileImage = '';
}

const MUser = new mongoose.Schema({
  username: String,
  displayName: {
    type: String,
    default: function () {
      return this.username;
    },
  },
  email: String,
  password: String,
  description: {
    type: String,
    default:
      'This is your description. You can edit it anytime. Have a nice day! ✌️',
  },
  avatar: {
    type: String,
    default: defaultProfileImage,
  },
  allMastered: {
    type: Number,
    default: 0,
  },
  allLearning: {
    type: Number,
    default: 0,
  },
  allNotStarted: {
    type: Number,
    default: 0,
  },
  friendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  sentRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  studySets: [
    {
      name: String,
      owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      sharedWith: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      questions: [
        {
          _id: false,
          question: String,
          answer: [
            {
              _id: {
                type: mongoose.Schema.Types.ObjectId,
                default: () => new mongoose.Types.ObjectId(),
              },
              text: String,
              right: Boolean,
            },
          ],
          que_type: String,
          correctCount: {
            type: Number,
            default: 0,
          },
          wrongCount: {
            type: Number,
            default: 0,
          },
          learningState: {
            type: String,
            enum: ['notStarted', 'learning', 'mastered'],
            default: 'notStarted',
          },
        },
      ],
      isFavorite: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

module.exports = mongoose.model('User', MUser);
