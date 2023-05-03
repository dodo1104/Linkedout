const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
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
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Comment = mongoose.model('comment', CommentSchema);
