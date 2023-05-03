const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Types.ObjectId,
    ref: 'profile'
  },
  text: {
    type: String,
    default: ''
  },
  file: {
    buffer: {
      type: Buffer
    },
    mimetype: {
      type: String
    },
    size: {
      type: Number
    }
  },
  comments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'comment',
      default: []
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('post', ProfileSchema);
