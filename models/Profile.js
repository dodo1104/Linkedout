const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  id: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  avatar: {
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
  background: {
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
  name: {
    type: String,
    default: 'john doe'
  },
  desc: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: ''
  },
  connectionsnumber: {
    type: Number,
    default: 0
  },
  opentowork: {
    type: String, //string which will become array in the frontend
    default: ''
  },
  currentwork: {
    type: String,
    default: ''
  },
  about: {
    type: String,
    default: ''
  },
  skills: {
    type: String, //string which will become array in the frontend
    default: ''
  },
  connections: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'profile',
      default: []
    }
  ],
  connectrequests: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'profile',
      default: []
    }
  ],
  posts: [
    //for the timeline of the user and the posts on the main page (posts of friends).
    //picked from the connections, so they don't need profile id in the DB.
    {
      type: mongoose.Types.ObjectId,
      ref: 'post',
      default: []
    }
  ],
  comments: [
    //for the timeline of the user and show profile of comment.
    //posts don't need profile id because they are picked from the profile of the post (from the connections) so there is access to the profile.
    //comments need profile id because ben can comment on chen's post and when chen's posts are loaded they need to contain the profile of each comment, but there is no access to ben's profile.
    //if the post of the comment was deleted, show "post not exist" message in frontend.
    {
      type: mongoose.Types.ObjectId,
      ref: 'comment',
      default: []
    }
  ],
  maintimeline: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'post',
      default: []
    }
  ],
  mytimeline: [
    {
      type: mongoose.Types.ObjectId,
      default: []
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
