const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const protect = asyncHandler(async (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization && authorization.startsWith('Bearer')) {
    try {
      const token = authorization.split(' ')[1];
      const userVerify = jwt.verify(token, 'masobimat');
      const userId = userVerify.id;
      // Tìm theo id để lấy thông tin user ngoại trừ password
      const userInfo = await userModel.findById(userId).select('-password');
      req.user = userInfo;
      next();
    } catch (error) {
      res.status(401);
      throw new Error('Token invalid');
    }
  } else {
    res.status(401);
    throw new Error('Not authorization or no token');
  }
});

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Member is not admin');
  }
};

module.exports = { protect, isAdmin };
