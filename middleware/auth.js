const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token');
  console.log('server - auth middleware - token:\n' + token);

  // Check if no token
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied.' });
  }

  // Verify token
  try {
    console.log('before decode');
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    console.log('after decode');
    req.user = decoded.user;
    next(); //a function that runs to get to the next middleware
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid.' });
  }
};
