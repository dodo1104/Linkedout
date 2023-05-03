const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const multer = require('multer');

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');

const uploadPost = multer({
  //dest: 'images', //save in a folder instead of passing it to the next middleware
  limits: 50000000 //50,000,000 = 50MB
  // fileFilter(req, file, cb) {
  //   if (file.originalname.match(/\.(png|jpg)$/)) {
  //     cb(undefined, true);
  //   } else {
  //     return cb(new Error('Please upload a PNG or a JPG file'));
  //   }
  // }
});

//POST /upload
//upload new post
//private
router.post('/upload', auth, uploadPost.single('file'), async (req, res) => {
  const { text = '' } = req.body;

  // console.log(req.file);
  picked = req.file
    ? (({ buffer, mimetype, size }) => ({ buffer, mimetype, size }))(req.file)
    : null;

  try {
    const profile = await Profile.findOne({ id: req.user.id }).select(
      '_id posts'
    );
    console.log('profile is: ' + profile._id);
    const post = new Post({
      profile: profile._id,
      text,
      file: { ...picked, buffer: picked.buffer.toString('base64') }
    });

    profile.posts.push(post);
    await post.save();
    await profile.save();
    res.status(201).send(profile);
    //write ref of post for each connection's maintimeline
  } catch (error) {
    console.error('router.post /posts/upload - server error: ' + error);
    res.status(500).send('server error');
  }
});

const uploadComment = multer({
  //dest: 'images', //save in a folder instead of passing it to the next middleware
  limits: 1000000, //1,000,000 = 1MB
  fileFilter(req, file, cb) {
    if (file.originalname.match(/\.(png|jpg)$/)) {
      cb(undefined, true);
    } else {
      return cb(new Error('Please upload a PNG or a JPG file'));
    }
  }
});

//POST /:post_id/remove
//remove a post
//private
router.delete('/:post_id/remove', auth, async (req, res) => {
  const { post_id } = req.params;

  try {
    const profile = await Profile.findOne({ id: req.user.id });
    if (profile.posts.indexOf(post_id) < 0) {
      return res.status(301).send({ msg: 'you are not the owner of the post' });
    }
    //delete post from user posts
    const posts = profile.posts.filter((post) => post.equals(post_id) == false);
    profile.posts = [...posts];
    await profile.save();

    Post.deleteOne({ _id: post_id }, (error) => {
      if (error) {
        console.error(
          'router.post /:post_id/remove - mongoose deletion error: ' + error
        );
        return res.status(500).send('server error');
      }
    });
    return res.status(201).send(posts);
  } catch (error) {
    console.error('router.post /:post_id/remove - server error: ' + error);
    res.status(500).send('server error');
  }
});

//POST /:post_id/comment
//comment on a post
//private
router.post(
  '/:post_id/comment',
  auth,
  uploadComment.single('file'),
  async (req, res) => {
    const { text = '' } = req.body;

    console.log(req.file);
    picked = req.file
      ? (({ buffer, mimetype, size }) => ({ buffer, mimetype, size }))(req.file)
      : null;

    try {
      const profile = await Profile.findOne({ id: req.user.id }).select(
        '_id comments'
      );
      console.log('profile is: ' + profile._id);

      const comment = new Comment({
        profile: profile._id,
        text,
        file: picked
          ? { ...picked, buffer: picked.buffer.toString('base64') }
          : null
      });

      profile.comments.push(comment);

      await comment.save();
      await profile.save();
      const fetchedPost = await Post.findOne({ _id: req.params.post_id });
      console.log(fetchedPost.comments);
      fetchedPost.comments.push(comment);
      await fetchedPost.save();
      res.status(201).send(fetchedPost.comments);
    } catch (error) {
      console.error(
        'router.post /posts/:post_id/comment - server error: ' + error
      );
      res.status(500).send('server error');
    }
  }
);

//GET /
//get related posts (posts of connections for the main page)
//private
router.get('/', auth, async (req, res) => {
  try {
    //get posts from all connections and user (no need for profile.timeline)
    // const { index } = req.body;
    // console.log('req.header:\n' + JSON.stringify(req.headers));
    let params =
      (req.query.body && JSON.parse(req.query.body)) || req.body || 0; //req from React || req from Postman || default
    const { index } = params;
    console.log('req:\n', index);
    // console.log('req.data:\n' + req.data);
    // alert(index);

    const limit = 1; //how much posts in a block
    // const profile = await Profile.findOne({ id: req.user.id });

    // const allProfiles = [...profile.connections, profile._id];
    // let timeline = await Promise.all(
    //   allProfiles.map((connProfile) => {
    //     return Post.find({ profile: connProfile })
    //       .limit(limit)
    //       .sort({ date: -1 })
    //       .populate('profile', ['avatar', 'name', 'desc'])
    //       .skip(limit * index);
    //   })
    // );

    // let assignedTimeline = timeline.flat(1);
    // assignedTimeline.sort((a, b) => {
    //   return b.date.getTime() - a.date.getTime(); //from new to old
    // });
    res.status(200).send({ msg: `${req.data}` });
    // res.status(200).send(assignedTimeline);
  } catch (error) {
    console.error('router.get /posts/ - server error: ' + error);
    res.status(500).send('server error');
  }
});

//GET /:post_id/comments
//get the comments of the post_id
//private
router.get('/:post_id/comments', auth, async (req, res) => {
  try {
    let params =
      (req.query.body && JSON.parse(req.query.body)) || req.body || 0; //req from React || req from Postman || default
    const { index, postId } = params;
    console.log('req:\n', index);
    console.log('req:\n', postId);

    // console.log('req.data:\n' + req.data);
    // alert(index);

    // let limit = index < 0 ? 2 : 10;//how much comments in a block. suppose to be 10
    // const post = await Post.findOne({ _id: req.params.post_id }).select(
    //   'comments'
    // );
    // // console.log('post:\n', post);
    // let timeline = await Promise.all(
    //   post.comments.map((comment) => {
    //     return (
    //       Comment.find({ _id: comment._id })
    //         .limit(limit)
    //         // .sort({ date: -1 })
    //         .populate()
    //         .skip(index < 0 ? 0 : limit*index)
    //     );
    //     // .populate({ path: 'comments', populate: { path: 'profile' } }) //profile is a field in comment
    //     // .skip(limit * index);
    //   })
    // );

    // let assignedTimeline = timeline.flat(1);
    // assignedTimeline.sort((a, b) => {
    //   return b.date.getTime() - a.date.getTime(); //from new to old
    // });

    // // console.log(assignedTimeline);
    res.status(200).send({ msg: `${req.data}` });
    // res.status(200).send(assignedTimeline);
  } catch (error) {
    console.error('router.get /posts/ - server error: ' + error);
    res.status(500).send('server error');
  }
});

module.exports = router;
