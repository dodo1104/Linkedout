const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const multer = require('multer');

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

const upload = multer({
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

//POST /profile/update
//update user profile for the first time (after registration)
//private
router.post('/update', auth, upload.any(), async (req, res) => {
  /*
  <img
  src="data:${mimetype};base64,${buffer}"
  />
  */
  // console.log(req.files);
  try {
    let profile = null;
    profile = await Profile.findOne({ id: req.user.id });
    if (!profile) {
      profile = new Profile({
        id: req.user.id
      }); //empty avatar or background is {}
    }
    //if nothing to update
    if (!Object.keys(req.body).length && req.files === undefined) {
      await profile.save();
      return res.status(400).send('no new updates to make');
    }

    // console.log(req.body);
    // console.log(req.files);
    const mappedFiles =
      req.files.length > 0
        ? req.files.map((pic) => {
            const { fieldname, buffer, mimetype, size } = pic;

            return {
              [fieldname]: {
                buffer: buffer.toString('base64'),
                mimetype,
                size
              }
            };
          })
        : null;

    console.log('mapped files: ' + JSON.stringify(mappedFiles));
    const imagesObject =
      mappedFiles !== null ? Object.assign(...mappedFiles) : {};
    console.log('POST registering');
    const {
      name = null,
      desc = null,
      state = null,
      connectionsnumber = null,
      opentowork = null,
      currentwork = null,
      about = null,
      skills = null
    } = req.body;

    if (imagesObject['avatar']) {
      profile.avatar = { ...imagesObject['avatar'] };

      // profile.avatar.buffer = parseInt(profile.avatar.buffer.toString(), 2); //convert to binary for the img src
      // console.log(parseInt(profile.avatar.buffer.toString(), 2));
      console.log('profile.avatar.buffer:\n' + profile.avatar.buffer);
    }
    if (imagesObject['background']) {
      profile.background = { ...imagesObject['background'] };
      profile.background.buffer = parseInt(
        profile.background.buffer.toString(),
        2
      ); //convert to binary for the img src
    }
    profile.name = name ? name : profile.name;
    profile.desc = desc ? desc : profile.desc;
    profile.state = state ? state : profile.state;
    profile.connectionsnumber = connectionsnumber
      ? connectionsnumber
      : profile.connectionsnumber;
    profile.opentowork = opentowork ? opentowork : profile.opentowork;
    profile.currentwork = currentwork ? currentwork : profile.currentwork;
    profile.about = about ? about : profile.about;
    profile.skills = skills ? skills : profile.skills;

    await profile.save();

    // const searched = await Profile.findOne({ id: req.user.id }).populate('id');
    // console.log(profile.avatar);
    // console.log(searched.avatar.buffer);
    res.status(201).send(profile);
  } catch (error) {
    console.error('router.post /profile/update - server error: ' + error);
    return res.status(500).send('server error');
  }

  //check in frontend if something new is the same as the old so we don't need to update,
  //instead, we won't send it to backend
});

//GET /profile/my-profile
//get user's profile
//private
router.get('/my-profile', auth, async (req, res) => {
  try {
    console.log('/profile/my-profile');
    const profile = await Profile.findOne({ id: req.user.id })
      .populate('connections')
      .populate('posts');
    if (!profile) {
      return res.status(300).send({ msg: 'invalid token' });
    }
    console.log(
      'router GET /profile/my-profile:\n' + profile.avatar.buffer.data
    );

    res.status(200).send(profile);
    // res.status(200).send('profile_id');
  } catch (error) {
    console.error('router.get /profile/my-profile - server error: ' + error);
    return res.status(500).send('server error');
  }
});

//GET /profile/search/:term
//get users' profiles by search term
//private
router.get('/search/:term', auth, async (req, res) => {
  try {
    const { term } = req.params;
    console.log('/profile/search/:term');

    // const regex = new RegExp(term, 'i');
    // const profiles = await Profile.find({ name: { $regex: regex } }).limit({
    //   max: 5
    // });

    // if (!profiles) {
    //   return res.status(300).send({ msg: 'invalid token' });
    // }
    // res.status(200).send(profiles);

    // console.log(profiles);
    res.status(200).send('no mongoDB');
  } catch (error) {
    console.error('router.get profile/search/:term - server error: ' + error);
    return res.status(500).send('server error');
  }
});

//GET /profile/:profile_id
//get user profile by profile_id
//private
router.get('/:profile_id', auth, async (req, res) => {
  try {
    const { profile_id } = req.params;
    console.log('req.params.profile_id: ' + profile_id);
    const profile = await Profile.findOne({ _id: profile_id })
      .populate('connections')
      .populate('posts');
    if (!profile) {
      return res.status(300).send({ msg: 'invalid token' });
    }
    console.log(
      'router GET /profile/:profile_id:\n' + profile.avatar.buffer.data
    );

    res.status(200).send(profile);
    // res.status(200).send(profile_id);
  } catch (error) {
    console.error('router.get /profile/:profile_id - server error: ' + error);
    return res.status(500).send('server error');
  }
});

//POST /profile/:profile_id/connect
//connect to user
//private
router.post('/:profile_id/connect', auth, async (req, res) => {
  try {
    const { profile_id } = req.params;

    const userProfile = await Profile.findOne({ id: req.user.id });
    if (!userProfile) {
      return res.status(300).send({ msg: 'invalid token' });
    }
    const connProfile = await Profile.findOne({ _id: profile_id });
    if (!connProfile) {
      return res.status(300).send({ msg: 'invalid profile' });
    }

    //check if profile_id exists in connections.
    if (userProfile.connections.indexOf(connProfile._id) >= 0) {
      //if so, return msg.
      return res.status(300).send({ msg: 'users are already connected' });
    }
    //check if profile_id exists in requests.
    if (userProfile.connectrequests.indexOf(connProfile._id) >= 0) {
      //if so, remove profile_id from user requests and add them to eachothers connections.
      userProfile.connectrequests = userProfile.connectrequests.filter(
        (item) => item != profile_id
      );
      userProfile.connections.push(connProfile._id);
      userProfile.connectionsnumber++;
      connProfile.connections.push(userProfile._id);
      connProfile.connectionsnumber++;
    }
    //if not, check if user exists in profile_id requests
    else {
      if (connProfile.connectrequests.indexOf(userProfile._id) >= 0)
        //if so, return msg
        return res
          .status(300)
          .send({ msg: 'connection request was already sent' });

      //if not, add user to profile_id requests.
      connProfile.connectrequests.push(userProfile._id);
    }
    await userProfile.save();
    await connProfile.save();
    res.status(201).send(userProfile);
  } catch (error) {
    console.error(
      'router.post /profile/:profile_id/connect - server error: ' + error
    );
    return res.status(500).send('server error');
  }
});

//POST /profile/:profile_id/disconnect
//disconnect from user or withdraw/decline connection request
//private
router.post('/:profile_id/disconnect', auth, async (req, res) => {
  try {
    const { profile_id } = req.params;
    const userProfile = await Profile.findOne({ id: req.user.id });
    if (!userProfile) {
      return res.status(300).send({ msg: 'invalid token' });
    }
    const connProfile = await Profile.findOne({ _id: profile_id });
    if (!connProfile) {
      return res.status(300).send({ msg: 'invalid profile' });
    }
    //check if profile_id existst in connections.
    if (userProfile.connections.indexOf(profile_id) >= 0) {
      //if so, remove it from both and reduce number of connections.
      var connections = userProfile.connections.filter(
        (item) => item.equals(profile_id) == false
      );
      console.log('if user connections: ' + connections);
      console.log(connections);
      userProfile.connections = connections.length > 0 ? connections : [];
      userProfile.connectionsnumber--;

      connections = connProfile.connections.filter(
        (item) => item.equals(userProfile._id) == false
      );
      console.log('if conn connections: ' + connections);
      connProfile.connections = connections.length > 0 ? connections : [];
      connProfile.connectionsnumber--;
    } else {
      //check if profile_id exists in user connectrequests.
      if (userProfile.connectrequests.indexOf(profile_id) >= 0) {
        //if so, remove it.
        const connectrequests = userProfile.connectrequests.filter(
          (item) => item.equals(profile_id) == false
        );
        userProfile.connectrequests =
          connectrequests.length > 0 ? connectrequests : [];
        console.log('else-if connectrequests: ' + connectrequests);
      }
      //check if user profile id exists in conn connectrequests
      else if (connProfile.connectrequests.indexOf(userProfile._id) >= 0) {
        //if so, remove it.

        const connectrequests = connProfile.connectrequests.filter(
          (item) => item.equals(userProfile._id) == false
        );
        console.log('else-else-if connectrequests: ' + connectrequests);
        connProfile.connectrequests =
          connectrequests.length > 0 ? connectrequests : [];
      } else
        return res.status(300).send({ msg: 'cannot remove unconnected user' });
    }
    console.log(userProfile);
    console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log(connProfile);
    await userProfile.save();
    await connProfile.save();
    res.status(201).send(userProfile);
  } catch (error) {
    console.error(
      'router.post /profile/:profile_id/connect - server error: ' + error
    );
    return res.status(500).send('server error');
  }
});

module.exports = router;
